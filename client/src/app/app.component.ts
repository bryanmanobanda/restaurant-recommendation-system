import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from "../environment/environment";
declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('mapContainer', {static: false}) mapContainer!: ElementRef;

  title = 'client';

  loadMap() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
  initMap() {}
  /*constructor(private securityService: SecurityService, private router: Router,) {}
  ngOnInit(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            this.securityService.pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            console.log(this.securityService.pos)

            this.router.navigate(['/recomendaciones']);
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
  }*/
  protected readonly environment = environment;

  ngOnInit(): void {
    (window as any).initMap = () => this.initMap();
    this.loadMap()
  }
}
