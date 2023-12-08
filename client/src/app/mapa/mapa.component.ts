import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from 'src/environment/environment';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  pos = {
    lat: 0,
    lng: 0,
  };

  hide = [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },]
    

  map: any;

  constructor() {}

  ngAfterViewInit(): void {
    (window as any).initMap = () => this.initMap();
    this.loadMap();
  }

  loadMap() {
    console.log('Crear mapa');
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  initMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          this.pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          const mapOptions = {
            center: this.pos,
            zoom: 18,
            minZoom: 13,
            maxZoom: 20,
            disableDefaultUI: true,
          };

          this.map = new google.maps.Map(
            this.mapContainer.nativeElement,
            mapOptions
          );

          new google.maps.Marker({
            position: this.pos,
            map: this.map,
          });

          const circle = new google.maps.Circle({
            strokeColor: '#148E62',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#148E62',
            fillOpacity: 0.12,
            map: this.map,
            center: this.pos,
            radius: 5000,
            zIndex: -1,
          });
          
          this.map.setOptions({ styles: this.hide });
          circle.setOptions({ clickable: false });

          const circleBounds = circle.getBounds();

          this.map.addListener('drag', () => {
            if (circleBounds.contains(this.map.getCenter())) return;
            this.map.panTo(circleBounds.getCenter());
          });

          /*const infoWindow = new google.maps.InfoWindow();
          infoWindow.setPosition(this.pos);
          //infoWindow.setContent('Mi ubicación');
          infoWindow.open(this.map);*/
          this.map.setCenter(this.pos);
        },
        () => {
          console.log('Ubicación no encontrada por problemas en aceptar');
        }
      );
    } else {
      this.handleLocationError(false);
    }
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
