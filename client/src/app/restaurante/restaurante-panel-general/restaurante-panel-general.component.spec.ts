import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantePanelGeneralComponent } from './restaurante-panel-general.component';

describe('RestaurantePanelGeneralComponent', () => {
  let component: RestaurantePanelGeneralComponent;
  let fixture: ComponentFixture<RestaurantePanelGeneralComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantePanelGeneralComponent]
    });
    fixture = TestBed.createComponent(RestaurantePanelGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
