import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import firebase from 'firebase/compat/app';
import {AuthProvider, GoogleAuthProvider, FacebookAuthProvider} from "@angular/fire/auth";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {catchError, map, Observable} from "rxjs";
import {environment} from "../../environment/environment";
import {Turista} from "../../Modelo/turista.interface";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  authState$ = this.afAuth.authState
  turista: Turista
  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
  }

  signInWithFacebook():  Promise<firebase.auth.UserCredential> {
    const provider = new FacebookAuthProvider();
    return this.callPopUp(provider)
  }

  signInWithGoogle():  Promise<firebase.auth.UserCredential> {
    const provider = new GoogleAuthProvider();
    return this.callPopUp(provider)
  }

  async callPopUp(provider: AuthProvider):  Promise<firebase.auth.UserCredential>{
    try{
      return await this.afAuth.signInWithPopup(provider);
    }catch (error:any){
      return error
    }
  }

  logOut(): Promise<void>{
    return this.afAuth.signOut();
  }

  registrarUsuario(data: any): Observable<any> {
    const url = `${environment.BASE_URL}/registrarUsuario`;
    return this.http.post<any>(url, data, {observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => {
        const status = response.status;
        const responseData = response.body;
        const message = response.body.message;

        const turista: Turista = {
          uid: responseData?.nuevoTurista?.uid,
          nombre: responseData?.nuevoTurista?.nombre,
          correo: responseData?.nuevoTurista?.correo,
          foto: '',
          cocina: {},
          calidad_servicio: {},
          nivel_precio: {}
        };

        return {status, turista, message};
      }),
      catchError((error) => {
        throw error;
      })
    );
  }
}
