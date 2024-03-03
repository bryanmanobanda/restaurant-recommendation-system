import {Injectable} from '@angular/core';
import {Turista} from "../../Modelo/turista.interface";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UbicationService {
  pos = {
    lat: 0,
    lng: 0,
  };

  circleRadius: BehaviorSubject<number> = new BehaviorSubject<number>(5000); // Valor predeterminado de 5000 metros (5 km)

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

  updateCircleRadius(radius: number) {
    this.circleRadius.next(radius);
  }
}
