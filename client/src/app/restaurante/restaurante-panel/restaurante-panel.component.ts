import {Component, OnDestroy, OnInit} from '@angular/core';
import {UbicationService} from "../../services/ubication.service";
import {RestaurantService} from "../../services/restaurant.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import Restaurant from "../../../Modelo/restaurante.interface";

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

  constructor(private ubication: UbicationService, private filter: RestaurantService, private router: Router) {
  }

  ngOnInit(): void {
    this.pos = this.ubication.pos
    this.fetchRestaurantes()
  }

  ngOnDestroy() {
    if (this.listRestaurantsSubscription) {
      this.listRestaurantsSubscription.unsubscribe();
    }
  }

  private fetchRestaurantes(): void {
    this.listRestaurantsSubscription = this.filter.obtenerRestaurantes(this.ubication.pos)
      .subscribe(
        (data) => {
          this.filter.actualizarListaRestaurantes(data);
          this.listaRestaurantes = this.filter.obtenerListaRestaurantes();
        }
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
      this.router.navigateByUrl("recomendaciones(information:informacion)")
    }
  }
}
