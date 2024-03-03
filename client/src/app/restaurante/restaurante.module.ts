import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RestauranteCardComponent} from './restaurante-card/restaurante-card.component';
import {RestaurantePanelComponent} from './restaurante-panel/restaurante-panel.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';
import {MatRadioModule} from '@angular/material/radio';



import {RestauranteInformationComponent} from './restaurante-information/restaurante-information.component';
import { RestaurantePanelGeneralComponent } from './restaurante-panel-general/restaurante-panel-general.component';
import { PanelRecomendacionesComponent } from './panel-recomendaciones/panel-recomendaciones.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSliderModule} from "@angular/material/slider";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    RestauranteCardComponent,
    RestaurantePanelComponent,
    RestauranteInformationComponent,
    RestaurantePanelGeneralComponent,
    PanelRecomendacionesComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatTableModule,
        MatListModule,
        MatExpansionModule,
        MatSliderModule,
        ReactiveFormsModule,
        FormsModule,
        MatRadioModule
    ],
  exports: [
    RestauranteCardComponent,
    RestaurantePanelComponent,
    RestauranteInformationComponent,
    RestaurantePanelGeneralComponent,
    PanelRecomendacionesComponent
  ]
})
export class RestauranteModule {
}
