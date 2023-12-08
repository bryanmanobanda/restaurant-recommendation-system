import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantePanelComponent } from './restaurante/restaurante-panel/restaurante-panel.component';
import { FiltroComponent } from './filtro/filtro.component';

const routes: Routes = [
      {
        path: 'filtros',
        component: FiltroComponent,
      },
      {
        path: 'recomendaciones',
        component: RestaurantePanelComponent,
      },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
