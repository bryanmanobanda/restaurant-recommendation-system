import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantePanelComponent} from './restaurante/restaurante-panel/restaurante-panel.component';
import {FiltroComponent} from './filtro/filtro.component';
import {RegistroComponent} from "./registro/registro.component";
import {RestauranteInformationComponent} from "./restaurante/restaurante-information/restaurante-information.component";

const routes: Routes = [
  {
    path: 'filtros',
    component: FiltroComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'recomendaciones',
    component: RestaurantePanelComponent,
  },
  {
    path: 'informacion',
    component: RestauranteInformationComponent,
    outlet: 'information'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
