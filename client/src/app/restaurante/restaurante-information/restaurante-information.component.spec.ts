import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RestauranteInformationComponent} from './restaurante-information.component';

describe('RestauranteInformationComponent', () => {
  let component: RestauranteInformationComponent;
  let fixture: ComponentFixture<RestauranteInformationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestauranteInformationComponent]
    });
    fixture = TestBed.createComponent(RestauranteInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
