import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environment/environment";
import Restaurant from "../../Modelo/restaurante.interface";

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private listaRestaurantes: Restaurant[] = [];
  private listaRestaurantesSubject: Subject<Restaurant[]> = new Subject<Restaurant[]>();

  constructor(private http: HttpClient) {}

  enviarDatosAlBackend(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_URL}/preferences`, data);
  }

  obtenerRestaurantes(location: any): Observable<any> {
    const coordinatesString: string = `${location.lat},${location.lng}`;
    return this.http.get<any>(`${environment.BASE_URL}/api/restaurants/${coordinatesString}`);
  }

  obtenerListaRestaurantes(): Restaurant[] {
    return this.listaRestaurantes;
  }

  actualizarListaRestaurantes(data: any): void {
    this.listaRestaurantes = data.restaurants || [];
    this.listaRestaurantesSubject.next(this.listaRestaurantes);
  }

  obtenerListaRestaurantesObservable(): Observable<Restaurant[]> {
    return this.listaRestaurantesSubject.asObservable();
  }
}
