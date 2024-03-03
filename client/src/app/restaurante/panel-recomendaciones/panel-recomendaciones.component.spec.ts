import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelRecomendacionesComponent } from './panel-recomendaciones.component';

describe('PanelRecomendacionesComponent', () => {
  let component: PanelRecomendacionesComponent;
  let fixture: ComponentFixture<PanelRecomendacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelRecomendacionesComponent]
    });
    fixture = TestBed.createComponent(PanelRecomendacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
