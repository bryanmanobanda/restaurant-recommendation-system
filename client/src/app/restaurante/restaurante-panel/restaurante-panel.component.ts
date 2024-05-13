import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
  @Input() activeTabIndex: number = 0;
  @Input() tabs: number = 0;
  listaRestaurantes: any[] = [];
  selectedRestaurant: Restaurant | null;
  listRestaurantsSubscription: Subscription | undefined;
  pos: any
  uid: string|undefined
  uniqueCuisines: { cuisine: string, restaurants: Restaurant[] }[] = [];
  ready = false
  information = ""

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
    console.log("Tab Index selected in component", this.activeTabIndex)
    if(this.listaRestaurantes.length === 0) {
      this.listRestaurantsSubscription = this.filter.obtenerRestaurantes(this.ubication.pos, this.uid, 5000)
        .subscribe(
          (data) => {
            console.log(data)
            this.filter.setTurista(data.user_Profile)
            this.filter.actualizarListaRestaurantes(data);
            this.listaRestaurantes = this.filtrarRestaurantesSegunPerfil(
              this.filter.obtenerListaRestaurantes(),
              this.filter.userProfile,
              this.activeTabIndex
            );
            this.calculateUniqueCuisines();
            this.filter.setListaSecundaria(this.listaRestaurantes);
            this.ready = true
          }
        );
    }else {
      this.listaRestaurantes = this.filtrarRestaurantesSegunPerfil(
        this.filter.obtenerListaRestaurantes(),
        this.filter.userProfile,
        this.activeTabIndex
      );
      this.calculateUniqueCuisines();
      this.filter.setListaSecundaria(this.listaRestaurantes);
      this.information = this.tabs == 2 ? (this.activeTabIndex == 0 ?
        "No se encontraron preferencias. Explora restaurantes 'Cerca de Ti'":
        "No se encuentran restaurantes en está área. Revisa tu horario y zona."):
        "Intenta con otras opciones"
      this.ready = true
    }
  }

  private filtrarRestaurantesSegunPerfil(
    restaurantes: Restaurant[],
    user_Profile: Turista,
    index: number
  ): Restaurant[] {
    if (!user_Profile || !user_Profile.cocina || Object.keys(user_Profile.cocina).length === 0 || this.tabs == 1) {
      return index === 0 ? ( this.tabs == 1 ? restaurantes: []): restaurantes;
    }

    const preferenciasKeys = Object.keys(user_Profile.cocina);

    return restaurantes.filter((restaurante) => index === 0 ? preferenciasKeys
      .includes(restaurante.primaryCuisine) : !preferenciasKeys.includes(restaurante.primaryCuisine));
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

  calculateUniqueCuisines() {
    const cuisineMap = new Map<string, Restaurant[]>();

    this.listaRestaurantes.forEach(restaurante => {
      if (cuisineMap.has(restaurante.primaryCuisine)) {
        cuisineMap.get(restaurante.primaryCuisine)?.push(restaurante);
      } else {
        cuisineMap.set(restaurante.primaryCuisine, [restaurante]);
      }
    });

    const orderedCuisineMap = new Map<string, Restaurant[]>(
        [...cuisineMap.entries()].sort(([cuisineA,], [cuisineB,]) => {
          const pesoA = this.filter.userProfile.cocina[cuisineA];
          const pesoB = this.filter.userProfile.cocina[cuisineB];
          return pesoB - pesoA;
        })
    );

    this.uniqueCuisines = Array.from(orderedCuisineMap.entries()).map(([cuisine, restaurants]) => {
      return { cuisine, restaurants };
    });
  }
}
