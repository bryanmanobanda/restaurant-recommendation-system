import { loadFeature, defineFeature } from "jest-cucumber";
import {MapaComponent} from "../../client/src/app/mapa/mapa.component";

const feature = loadFeature("./tests/features/demo.feature");

defineFeature(feature, test => {
    let component: MapaComponent; // Cambia el tipo de componente según tu implementación real
    ///let fixture: ComponentFixture<RegistroComponent>; // Cambia el tipo de fixture según tu implementación real

    /*beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [RegistroComponent],
            imports: [FormsModule], // Asegúrate de importar ReactiveFormsModule si estás usando formularios reactivos
        }).compileComponents();

        fixture = TestBed.createComponent(RegistroComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });*/

    test('Turista registra su información con datos válidos', ({ given, when, and, then }) => {
        given('el turista accede al formulario de registro', () => {
            //component.irAFormularioDeRegistro();
            console.assert(component.pos.lat === 0)
        });

        when('el turista completa todos los campos obligatorios con información válida', () => {

        });

        and('hace clic en el botón de enviar', () => {

        });

        then('la información del turista se registra correctamente en la base de datos', () => {

        });

        and('se muestra un mensaje de confirmación de registro exitoso', () => {

        });
    });


});
