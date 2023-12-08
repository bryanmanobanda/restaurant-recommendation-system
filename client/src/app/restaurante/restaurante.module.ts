import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteCardComponent } from './restaurante-card/restaurante-card.component';
import { RestaurantePanelComponent } from './restaurante-panel/restaurante-panel.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [
    RestauranteCardComponent,
    RestaurantePanelComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
   exports: [
    RestauranteCardComponent,
    RestaurantePanelComponent
   ]
})
export class RestauranteModule { }
