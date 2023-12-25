import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {environment} from 'src/environment/environment';
import {UbicationService} from "../services/ubication.service";
import {FilterService} from "../services/filter.service";

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements AfterViewInit {
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

  constructor(private ubication: UbicationService, private filter: FilterService) {
  }

  ngAfterViewInit(): void {
    (window as any).initMap = () => this.initMap();

    this.loadMap();
    this.filter.obtenerListaRestaurantesObservable().subscribe(listaRestaurantes => {
      if (this.map && listaRestaurantes.length > 0) {
        this.updateMarkers(listaRestaurantes);
      }
    });
  }

  loadMap() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  initMap(): void {
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

    new google.maps.Marker({
      position: this.ubication.pos,
      map: this.map,
    });

    const circle = this.circleMap();
    const circleBounds = circle.getBounds();

    this.map.addListener('drag', () => {
      if (circleBounds.contains(this.map.getCenter())) return;
      this.map.panTo(circleBounds.getCenter());
    });

    /*const infoWindow = new google.maps.InfoWindow();
    infoWindow.setPosition(this.pos);
    //infoWindow.setContent('Mi ubicación');
    infoWindow.open(this.map);*/
    //this.map.setCenter(this.ubication.pos);
    //this.updateMarkers();
  }

  updateMarkers(listaRestaurantes: any[]): void {
    listaRestaurantes.forEach(restaurante => {
      new google.maps.Marker({
        position: {lat: parseFloat(restaurante.location.latitude), lng: parseFloat(restaurante.location.longitude)},
        map: this.map,
        title: restaurante.displayName,
        icon: {
          url: 'https://maps.google.com/mapfiles/ms/icons/orange-dot.png'
        }
      });
    });
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

  handleLocationError(
    browserHasGeolocation: boolean,
    error?: GeolocationPositionError
  ): void {
    let errorMessage = '';
    if (browserHasGeolocation) {
      errorMessage = 'Error: The Geolocation service failed.';
    } else {
      errorMessage = "Error: Your browser doesn't support geolocation.";
    }

    if (error) {
      errorMessage += ` Message: ${error.message}`;
    }

    console.error(errorMessage);
  }
}
