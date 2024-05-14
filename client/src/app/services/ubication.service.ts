import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UbicationService {
  circleRadius: BehaviorSubject<number> = new BehaviorSubject<number>(5000);
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
          reject();
        }
      );
    });
  }

  updateCircleRadius(radius: number) {
    this.circleRadius.next(radius);
  }
}
