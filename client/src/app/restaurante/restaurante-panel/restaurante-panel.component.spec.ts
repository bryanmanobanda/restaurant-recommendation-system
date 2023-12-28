import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RestaurantePanelComponent} from './restaurante-panel.component';

describe('RestaurantePanelComponent', () => {
  let component: RestaurantePanelComponent;
  let fixture: ComponentFixture<RestaurantePanelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestaurantePanelComponent]
    });
    fixture = TestBed.createComponent(RestaurantePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
