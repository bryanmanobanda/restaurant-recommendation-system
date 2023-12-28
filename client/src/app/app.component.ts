import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
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
}
