import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {FiltroComponent} from './filtro.component';
import {RestaurantService} from "../services/restaurant.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {of} from "rxjs";
import {RouterTestingModule} from "@angular/router/testing";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {Router} from "@angular/router";

class Page {
  get searchButton() {
    return this.fixture.nativeElement.querySelector("#buscar");
  }

  get clasificacionSelect() {
    return this.fixture.debugElement.nativeElement.querySelector("#rating");
  }

  get nivelPrecio() {
    return this.fixture.debugElement.nativeElement.querySelector("#price_level");
  }

  get cuisine() {
    return this.fixture.debugElement.nativeElement.querySelector("#cuisine");
  }

  constructor(private fixture: ComponentFixture<FiltroComponent>) {
  }

  public updateValue(input: HTMLInputElement, value: string) {
    input.value = value
    input.dispatchEvent(new Event('input'));
  }
}

fdescribe('FiltroComponent', () => {
  let filtroComponent: FiltroComponent;
  let fixture: ComponentFixture<FiltroComponent>;

  let filterService: RestaurantService;
  let router: Router;
  let page: Page;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroComponent],
      imports: [ReactiveFormsModule, MatChipsModule, MatSelectModule, RouterTestingModule.withRoutes([]), HttpClientModule, BrowserAnimationsModule, MatFormFieldModule, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule,],
    }).compileComponents();
    fixture = TestBed.createComponent(FiltroComponent);
    filtroComponent = fixture.componentInstance;
    filterService = TestBed.inject(RestaurantService)
    router = TestBed.inject(Router);
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('deberia crear FiltroComponent', () => {
    expect(filtroComponent).toBeDefined();
  });

  it('debería guardar preferencias y mostrarme los restaurantes', fakeAsync(() => {
    const formData = {
      servicio: 'three',
      nivelPrecio: 'four',
      cocina: ['Mexicana', 'Italiana']
    };

    const serviceSpy = spyOn(filterService, 'enviarDatosAlBackend').and.returnValue(of(formData));
    const ratingControl = fixture.componentInstance.filterForm.get('rating');
    const priceLevelControl = fixture.componentInstance.filterForm.get('price_level');

    if (ratingControl) {
      ratingControl.setValue('three');
    }

    if (priceLevelControl) {
      priceLevelControl.setValue('four');
    }

    filtroComponent.selectedCuisines = formData.cocina;
    spyOn(router, 'navigate');
    page.searchButton.click();
    tick();

    expect(router.navigate).toHaveBeenCalledWith(['/recomendaciones']);
    expect(serviceSpy).toHaveBeenCalledWith(formData);
  }));


});
