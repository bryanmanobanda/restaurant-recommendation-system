import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FiltroComponent} from './filtro/filtro.component';
import {MapaComponent} from './mapa/mapa.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

import {HttpClientModule} from '@angular/common/http';
import {RestauranteModule} from './restaurante/restaurante.module';
import {PaginaPrincipalComponent} from './pagina-principal/pagina-principal.component';
import {AccesoComponent} from './acceso/acceso.component';
import {UbicationService} from "./services/ubication.service";
import {environment} from "../environment/environment";
import {AngularFireModule} from "@angular/fire/compat";
import { MatTabsModule } from '@angular/material/tabs';

export function iniciarApp(ubicacionService: UbicationService) {
  return () => ubicacionService.obtenerUbicacion();
}

@NgModule({
  declarations: [AppComponent, FiltroComponent, MapaComponent, PaginaPrincipalComponent, AccesoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    HttpClientModule,
    RestauranteModule,
    MatCardModule,
    MatChipsModule,
    MatTabsModule,
    MatSidenavModule,
    MatMenuModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.FIREBASE),
  ],
  providers: [
    UbicationService,
    {
      provide: APP_INITIALIZER,
      useFactory: iniciarApp,
      deps: [UbicationService],
      multi: true
    }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
