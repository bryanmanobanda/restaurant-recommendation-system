import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {UbicationService} from "../services/ubication.service";
import {RestaurantService} from "../services/restaurant.service";
import Routes from "../../Modelo/ruta.interface";
import {Subscription} from "rxjs";

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', {static: false}) mapContainer!: ElementRef;

  hide = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{visibility: "off"}],
    },
    {
      featureType: "transit",
      elementType: "labels",
      stylers: [{visibility: "off"}],
    },]
  map: any;
  rutaPolyline: any;
  ruta: Routes;
  infoWindow: any;
  markers: any[] = [];
  listaRestaurantesSubscription: Subscription | undefined;
  recibirRutaSubscription: Subscription | undefined;
  enviarRutaSubscription: Subscription | undefined;

  constructor(private ubication: UbicationService, private filter: RestaurantService) {
  }

  ngAfterViewInit(): void {
    this.initMap()

    this.listaRestaurantesSubscription = this.filter.obtenerListaRestaurantesObservable().subscribe(listaRestaurantes => {
      if (this.map && listaRestaurantes.length > 0) {
        this.clearMarkers();
        this.updateMarkers(listaRestaurantes);
      }
    });

    this.recibirRutaSubscription = this.filter.recibirRuta().subscribe((data) => {
      this.ruta = data
      this.drawRoutes();
    });
  }

  ngOnDestroy() {
    if (this.listaRestaurantesSubscription) {
      this.listaRestaurantesSubscription.unsubscribe();
    }

    if (this.recibirRutaSubscription) {
      this.recibirRutaSubscription.unsubscribe();
    }

    if (this.enviarRutaSubscription) {
      this.enviarRutaSubscription.unsubscribe();
    }
  }

  initMap() {
    const mapOptions = {
      center: this.ubication.pos,
      zoom: 18,
      minZoom: 13,
      maxZoom: 20,
      disableDefaultUI: true,
      styles: this.hide
    };

    this.map = new google.maps.Map(
      this.mapContainer.nativeElement,
      mapOptions
    );


    const myLocationMarker = new google.maps.Marker({
      position: this.ubication.pos,
      map: this.map,
    });

    const circle = this.circleMap();
    const circleBounds = circle.getBounds();

    this.map.addListener('drag', () => {
      if (circleBounds.contains(this.map.getCenter())) return;
      this.map.panTo(circleBounds.getCenter());
    });

    const infoWindowMyLocation = new google.maps.InfoWindow({content: "Mi ubicación"});
    myLocationMarker.addListener('click', () => {
      infoWindowMyLocation.open(this.map, myLocationMarker);
    });
  }

  clearMarkers() {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  updateMarkers(listaRestaurantes: any[]) {
    listaRestaurantes.forEach(restaurante => {

      const marker = new google.maps.Marker({
        position: {lat: parseFloat(restaurante.location.latitude), lng: parseFloat(restaurante.location.longitude)},
        map: this.map,
        title: restaurante.displayName,
        icon: {
          url: 'assets/restaurant_pin.png',
          scaledSize: new google.maps.Size(35, 50)
        }
      });

      const markersInfoWindow = new google.maps.InfoWindow({
        content: restaurante.displayName
      });

      marker.addListener('click', () => {
        markersInfoWindow.open(this.map, marker);
        this.enviarRutaSubscription = this.filter.obtenerRutaRestaurante(restaurante.id, this.ubication.pos)
          .subscribe({
            next: (data) => {
              this.filter.enviarRuta(data.route);
            },
            error: (error) => console.error(error),
            complete: () => console.info('complete')
          });
      });

      this.markers.push(marker);
    });
  }

  drawRoutes(): void {
    if (this.map && this.ruta) {
      if (this.rutaPolyline) {
        this.rutaPolyline.setMap(null);
      }

      const decodedPath = google.maps.geometry.encoding.decodePath(this.ruta.polyline);
      const rutaPolyline = this.rutaPolyline = new google.maps.Polyline({
        path: decodedPath,
        geodesic: true,
        strokeColor: '#0B48A5',
        strokeOpacity: 1.0,
        strokeWeight: 3,
        map: this.map
      });

      const distanciaEnKilometros = this.ruta.distanceMeters >= 1000 ? (this.ruta.distanceMeters / 1000).toFixed(2) + ' km' : this.ruta.distanceMeters + ' metros';
      const tiempoEnTexto = this.formatDuration(this.ruta.duration);

      const halfIndex = Math.floor(decodedPath.length / 2);
      const middlePosition = decodedPath[halfIndex];

      const infoWindowContent = `
      <div style="font-size: 12px;">
        <h3>Información de ruta a pie</h3>
        <p><strong>Distancia:</strong> ${distanciaEnKilometros}</p>
        <p><strong>Tiempo de llegada:</strong> ${tiempoEnTexto}</p>
      </div>
    `;

      if (this.infoWindow) {
        this.infoWindow.close();
      }

      this.infoWindow = new google.maps.InfoWindow({
        content: infoWindowContent
      })

      this.infoWindow.setPosition(middlePosition);
      this.infoWindow.open(this.map);

      rutaPolyline.addListener('click', () => {
        this.infoWindow.setPosition(middlePosition);
        this.infoWindow.open(this.map);
      });
    }
  }

  circleMap() {
    return new google.maps.Circle({
      strokeColor: '#148E62',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#148E62',
      fillOpacity: 0.12,
      map: this.map,
      center: this.ubication.pos,
      radius: 5000,
      zIndex: -1,
      clickable: false
    });
  }

  formatDuration(duration: string): string {
    const tiempo = parseInt(this.extractMinutesFromDuration(duration));
    if (!isNaN(tiempo)) {
      if (tiempo >= 3600) {
        const horas = Math.floor(tiempo / 3600);
        const minutos = Math.floor((tiempo % 3600) / 60);
        return `${horas} horas ${minutos} minutos`;
      } else if (tiempo >= 60) {
        const minutos = Math.floor(tiempo / 60);
        const segundos = tiempo % 60;
        return `${minutos} minutos ${segundos} segundos`;
      } else {
        return `${tiempo} segundos`;
      }
    }
    return duration;
  }

  extractMinutesFromDuration(duration: string): string {
    const pattern = /\d+/;
    const matches = duration.match(pattern);
    if (matches && matches.length > 0) {
      return matches[0];
    }
    return '0';
  }
}
