import {Component, OnDestroy, OnInit} from '@angular/core';
import {UbicationService} from "../../services/ubication.service";
import {RestaurantService} from "../../services/restaurant.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import Restaurant from "../../../Modelo/restaurante.interface";
import {SecurityService} from "../../services/security.service";
import {Turista} from "../../../Modelo/turista.interface";

@Component({
  selector: 'app-restaurante-panel',
  templateUrl: './restaurante-panel.component.html',
  styleUrls: ['./restaurante-panel.component.scss']
})
export class RestaurantePanelComponent implements OnInit, OnDestroy {
  listaRestaurantes: any[] = [];
  selectedRestaurant: Restaurant | null;
  listRestaurantsSubscription: Subscription | undefined;
  pos: any
  uid: string|undefined

  constructor(private ubication: UbicationService, private filter: RestaurantService, private router: Router, private ss:SecurityService) {
  }

  ngOnInit(): void {
    this.pos = this.ubication.pos
    this.uid = this.ss.turista.uid
    this.listaRestaurantes = this.filter.obtenerListaRestaurantes()
    this.fetchRestaurantes()
  }

  ngOnDestroy() {
    if (this.listRestaurantsSubscription) {
      this.listRestaurantsSubscription.unsubscribe();
    }
  }

  private fetchRestaurantes(): void {
    if(this.listaRestaurantes.length === 0) {
      this.listRestaurantsSubscription = this.filter.obtenerRestaurantes(this.ubication.pos, this.uid)
        .subscribe(
          (data) => {
            console.log(data)
            this.filter.actualizarListaRestaurantes(data);
            this.listaRestaurantes = this.filtrarRestaurantesSegunPerfil(
              this.filter.obtenerListaRestaurantes(),
              data.user_Profile
            );
          }
        );
    }else{
      this.listaRestaurantes = this.filter.obtenerListaRestaurantes()
    }
  }

  private filtrarRestaurantesSegunPerfil(
    restaurantes: Restaurant[],
    user_Profile: Turista
  ): Restaurant[] {
    if (!user_Profile) {
      console.log("No se ha cargado el perfil")
      return restaurantes; // Si no se ha cargado el perfil, mostrar todos los restaurantes
    }
    const preferencias = user_Profile.cocina;
    if (!preferencias || Object.keys(preferencias).length === 0) {
      console.log("No existen preferencoas")
      return restaurantes; // Si no hay preferencias definidas, mostrar todos los restaurantes
    }
    console.log("Existen preferencias")
    const preferenciasKeys = Object.keys(preferencias);
    console.log(preferenciasKeys)
    return restaurantes.filter((restaurante) =>
      preferenciasKeys.includes(restaurante.primaryCuisine)
    );
  }

  onRestauranteClicked(restaurante: Restaurant | null): void {
    this.filter.getSelectedRestaurant()
      .subscribe(
        (data) => {
          this.selectedRestaurant = data
        }
      ).unsubscribe();

    if (this.selectedRestaurant === restaurante) {
      this.filter.setSelectedRestaurant(null);
      this.selectedRestaurant = null
      this.router.navigateByUrl("recomendaciones")
    } else {
      this.filter.setSelectedRestaurant(restaurante);
      this.selectedRestaurant = restaurante
      this.router.navigateByUrl("recomendaciones(information:informacion)", {skipLocationChange: true})
    }
  }

  go_filter(){
    this.router.navigateByUrl('filtros')
  }
}
