import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UbicationService {
  pos = {
    lat: 0,
    lng: 0,
  };

  async obtenerUbicacion(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            this.pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve();
          },
          () => {
            console.log('Ubicación no encontrada por problemas en aceptar');
            reject();
          }
      );
    });
  }
}
