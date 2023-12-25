import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestauranteCardComponent } from './restaurante-card/restaurante-card.component';
import { RestaurantePanelComponent } from './restaurante-panel/restaurante-panel.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';

import { RestauranteInformationComponent } from './restaurante-information/restaurante-information.component';




@NgModule({
  declarations: [
    RestauranteCardComponent,
    RestaurantePanelComponent,
    RestauranteInformationComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatListModule
  ],
   exports: [
    RestauranteCardComponent,
    RestaurantePanelComponent
   ]
})
export class RestauranteModule { }
