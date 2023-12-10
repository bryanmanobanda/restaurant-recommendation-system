import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RegistroComponent} from './registro.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SecurityService} from "../services/security.service";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Turista} from "../../Modelo/turista.interface";
import {of} from "rxjs";
import {HttpClientModule} from "@angular/common/http";

class Page {
  get submitButton() {
    return this.fixture.nativeElement.querySelector("#submitButton");
  }

  get nombreInput() {
    return this.fixture.debugElement.nativeElement.querySelector("#nombre");
  }

  get correoInput() {
    return this.fixture.debugElement.nativeElement.querySelector("#correo");
  }

  constructor(private fixture: ComponentFixture<RegistroComponent>) {
  }

  public updateValue(input: HTMLInputElement, value: string) {
    input.value = value
    input.dispatchEvent(new Event('input'));
  }
}

fdescribe('RegistroComponent', () => {
  let registroComponent: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  let securityService: SecurityService;
  let page: Page;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      imports: [ReactiveFormsModule, HttpClientModule, BrowserAnimationsModule, MatFormFieldModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule,],
      providers: []
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    registroComponent = fixture.componentInstance;
    securityService = TestBed.inject(SecurityService);
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('debería crear RegistroComponent', () => {
    expect(registroComponent).toBeDefined();
  })

  it('debería registrarse exitosamente y  mostrar mensaje de confirmación', () => {
    const turista: Turista = {
      uid: '123',
      nombre: 'Alexander Martinez',
      correo: 'alexander1324@hotmail.com',
    }
    const response = {
      status: 201,
      turista: {uid: '123', nombre: turista.nombre, correo: turista.correo},
      message: '¡Registro exitoso!'
    };

    page.updateValue(page.correoInput, turista.correo);
    page.updateValue(page.nombreInput, turista.nombre);

    const serviceSpy = spyOn(securityService, "registrarUsuario").and.returnValue(of(response));

    page.submitButton.click();
    fixture.detectChanges();
    expect(registroComponent.mensajeError).toEqual('');
    expect(registroComponent.mensajeConfirmacion).toEqual(response.message);
    expect(registroComponent.turista.correo).toEqual(turista.correo);
    expect(registroComponent.turista.nombre).toEqual(turista.nombre);
    expect(serviceSpy).toHaveBeenCalledWith({nombre: turista.nombre, correo: turista.correo});
  });

  it('debería mostrar un mensaje de informaciión ingresada incorrecta', () => {
    const turista: Turista = {
      uid: '123',
      nombre: 'Alexander Martinez 1325',
      correo: 'alexander1324hotmail.com',
    }
    page.updateValue(page.correoInput, turista.correo);
    page.updateValue(page.nombreInput, turista.nombre);

    page.submitButton.click();
    fixture.detectChanges();
    expect(registroComponent.mensajeError).toEqual('Los datos ingresados son inválidos.');
    expect(registroComponent.mensajeConfirmacion).toEqual('');
    expect(registroComponent.turista).toBeUndefined();
  });

  it('debería mostrar un mensaje de de error al registrar con campos vacíos', () => {
    const turista: Turista = {
      uid: '123',
      nombre: '',
      correo: '',
    }
    page.updateValue(page.correoInput, turista.correo);
    page.updateValue(page.nombreInput, turista.nombre);

    page.submitButton.click();
    fixture.detectChanges();
    expect(registroComponent.mensajeError).toEqual('Los datos ingresados son inválidos.');
    expect(registroComponent.mensajeConfirmacion).toEqual('');
    expect(registroComponent.turista).toBeUndefined();
  });

  it('debería indicarme que estoy registrandome con un correo ya registrado', () => {
    const turista: Turista = {
      uid: '123',
      nombre: 'Alexander Martinez',
      correo: 'alexander1324@hotmail.com',
    }
    const response = {
      status: 201,
      turista: {uid: '123', nombre: turista.nombre, correo: turista.correo},
      message: 'Correo ya registado'
    };

    page.updateValue(page.correoInput, turista.correo);
    page.updateValue(page.nombreInput, turista.nombre);

    const serviceSpy = spyOn(securityService, "registrarUsuario").and.returnValue(of(response));

    page.submitButton.click();
    fixture.detectChanges();
    expect(registroComponent.mensajeError).toEqual('Correo ya registado');
    expect(registroComponent.mensajeConfirmacion).toEqual('');
    expect(registroComponent.turista).toBeUndefined();
    expect(serviceSpy).toHaveBeenCalledWith({nombre: turista.nombre, correo: turista.correo});
  });
});
