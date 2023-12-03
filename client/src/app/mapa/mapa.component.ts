import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { environment } from 'src/environment/environment';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements AfterViewInit  {
  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;

  pos = {
    lat: 0,
    lng: 0
  };
  
  map: any;

  constructor() {}

  ngAfterViewInit(): void {
    (window as any).initMap = () => this.initMap();
    this.setupLocationButton();
    this.loadMap()
    
  }

  loadMap() {
    console.log("esto es primero")
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  initMap(): void {
    console.log("esto es ultimo")
    console.log("carga de mapa")
    const mapOptions = {
      center: this.pos,
      zoom: 8
    };
    this.map = new google.maps.Map(this.mapContainer.nativeElement, mapOptions);
  }

  setupLocationButton(): void {
    console.log("esto es tercero")
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            this.pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
          
            const infoWindow = new google.maps.InfoWindow();
            infoWindow.setPosition(this.pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(this.map);
            this.map.setCenter(this.pos);
          },
          () => {
            // handleLocationError function here
          }
        );
      } else {
        // Browser doesn't support Geolocation
        // handleLocationError function here
        this.handleLocationError(false);
      };
  }

  handleLocationError(browserHasGeolocation: boolean, error?: GeolocationPositionError): void {
    let errorMessage = '';
    if (browserHasGeolocation) {
      errorMessage = 'Error: The Geolocation service failed.';
    } else {
      errorMessage = 'Error: Your browser doesn\'t support geolocation.';
    }
    
    if (error) {
      errorMessage += ` Message: ${error.message}`;
    }
  
    console.error(errorMessage);
    // Handle the error - show a message to the user, log it, etc.
  }

}