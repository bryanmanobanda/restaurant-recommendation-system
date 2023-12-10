import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {Turista} from "../../Modelo/turista.interface";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private http: HttpClient) {}

  registrarUsuario(data: any): Observable<any> {
    const url = `${environment.BASE_URL}/registrarUsuario`;
    return this.http.post<any>(url, data, { observe: 'response' }).pipe(
        map((response: HttpResponse<any>) => {
            const status = response.status;
            const responseData = response.body;
            const message = response.body.message;

            const turista: Turista = {
                uid: responseData?.nuevoTurista?.uid,
                nombre: responseData?.nuevoTurista?.nombre,
                correo: responseData?.nuevoTurista?.correo
            };

            return { status, turista, message };
        }),
        catchError((error) => {
            throw error;
        })
    );
  }
}
