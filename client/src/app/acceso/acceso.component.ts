import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from "../services/security.service";
import {Turista} from "../../Modelo/turista.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.scss']
})
export class AccesoComponent implements OnDestroy {
  //turista: Turista
  registro: any;
  //mensajeConfirmacion: string = '';
  //mensajeError: string = '';

  constructor(private fb: FormBuilder, private ss: SecurityService, private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.registro != null)
      this.registro.unsubscribe();
    //this.mensajeError = '';
    //this.mensajeConfirmacion = '';
  }

/*
  enviarFormulario(): void {
    if (this.registroForm.valid) {
      this.registro = this.ss.registrarUsuario(this.registroForm.value)
        .subscribe(
          (response) => {
            if (response.status === 201 && !response.message.includes('Correo')) {
              this.turista = response.turista;
              this.mensajeConfirmacion = response.message;
            } else {
              this.mensajeError = response.message;
            }
          },
          (error) => {
            this.mensajeError = 'Error al registrarse';
          }
        );
    } else {
      this.mensajeError = 'Los datos ingresados son inválidos.';
    }
  }*/

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
        this.registro = this.ss.registrarUsuario(data).subscribe(value => {})
      }
  }
}
