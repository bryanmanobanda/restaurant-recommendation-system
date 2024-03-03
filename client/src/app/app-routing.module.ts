import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RestaurantePanelComponent} from './restaurante/restaurante-panel/restaurante-panel.component';
import {FiltroComponent} from './filtro/filtro.component';
import {AccesoComponent} from "./acceso/acceso.component";
import {RestauranteInformationComponent} from "./restaurante/restaurante-information/restaurante-information.component";
import {PaginaPrincipalComponent} from "./pagina-principal/pagina-principal.component";
import {accesoGuard, authGuard} from "./auth.guard";
import {PanelRecomendacionesComponent} from "./restaurante/panel-recomendaciones/panel-recomendaciones.component";
import {PanelComponent} from "./panel/panel.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recomendaciones',
    pathMatch: "full"
  },
  {
    path: '',
    component: PaginaPrincipalComponent,
    canActivateChild:[authGuard],
    children: [
      {
        path: 'filtros',
        component: FiltroComponent,
      },
      {
        path: 'recomendaciones',
        component: PanelComponent,
      },
      {
        path: 'informacion',
        component: RestauranteInformationComponent,
        outlet: 'information',
      }
    ]
  },
  {
    path: 'acceso',
    component: AccesoComponent,
    canActivate: [accesoGuard]
  },
  {
    path: '**',
    redirectTo: '/recomendaciones'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
