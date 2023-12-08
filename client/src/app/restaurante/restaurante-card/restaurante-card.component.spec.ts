import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranteCardComponent } from './restaurante-card.component';

describe('RestauranteCardComponent', () => {
  let component: RestauranteCardComponent;
  let fixture: ComponentFixture<RestauranteCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestauranteCardComponent]
    });
    fixture = TestBed.createComponent(RestauranteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
