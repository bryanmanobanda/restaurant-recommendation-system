import {Component, OnDestroy} from '@angular/core';
import {SecurityService} from "../services/security.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.scss']
})
export class AccesoComponent implements OnDestroy {
  registro: any;

  constructor(private ss: SecurityService, private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.registro != null)
      this.registro.unsubscribe();
  }

  sigInwithFacebook(){
    try{
      this.ss.signInWithFacebook().
      then((result) => {
        this.registerUser(result)
        this.router.navigateByUrl("/recomendaciones")
      })
    }catch (error){
      console.error('Error al autenticar con Facebook:', error);
    }
  }

   async sigInwithGoogle(){
    try{
      this.ss.signInWithGoogle().
      then((result) => {
        this.registerUser(result)
        this.router.navigateByUrl("/recomendaciones")
      })
    }catch (error){
      console.error('Error al autenticar con Google:', error);
    }
  }

  registerUser(result: any){
      if (result.additionalUserInfo?.isNewUser) {
        const token = result.user._delegate.accessToken
        const user = {
            uid: result.user?.uid,
            nombre: result.user?.displayName,
            correo: result.user?.email,
            foto: result.user?.photoURL,
        }
        const data = {user, token}
        this.registro = this.ss.registrarUsuario(data).subscribe(value =>
        {this.router.navigateByUrl("/recomendaciones")})
      }
  }
}
