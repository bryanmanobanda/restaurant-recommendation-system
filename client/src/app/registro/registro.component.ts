import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecurityService} from "../services/security.service";
import {Turista} from "../../Modelo/turista.interface";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit, OnDestroy {
  turista: Turista
  registroForm: FormGroup;
  nombreNg: string;
  correoNg: string;
  registro: any;
  mensajeConfirmacion: string = '';
  mensajeError: string = '';

  constructor(private fb: FormBuilder, private ss: SecurityService) {
  }

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('^[A-Za-z ]+$'), Validators.minLength(4), Validators.maxLength(50)]],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnDestroy(): void {
    if (this.registro != null)
      this.registro.unsubscribe();
    this.mensajeError = '';
    this.mensajeConfirmacion = '';
    this.registroForm.reset();
  }

  get f() {
    return this.registroForm.controls;
  }

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
  }

  cancelarRegistro(): void {
    this.mensajeError = '';
    this.mensajeConfirmacion = '';
    this.registroForm.reset();
  }
}
