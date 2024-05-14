import {Component, OnDestroy, OnInit} from '@angular/core';
import Restaurant from "../../../Modelo/restaurante.interface";
import {RestaurantService} from "../../services/restaurant.service";
import {Subscription} from "rxjs";
import {environment} from "../../../environment/environment";
import Information from "../../../Modelo/informacion.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-restaurante-information',
  templateUrl: './restaurante-information.component.html',
  styleUrls: ['./restaurante-information.component.scss']
})
export class RestauranteInformationComponent implements OnInit, OnDestroy {
  dataSource = [{day: "", hours: ""}];
  enviarRutaSubscription: Subscription | undefined;
  restaurant_Information: Subscription | undefined;
  restaurant_selected: Subscription | undefined;
  restaurante: Restaurant | null = null;
  informacion: Information;
  displayedColumns = ['day', 'hours'];

  constructor(private restaurant: RestaurantService, private router:Router) {
  }

  ngOnInit(): void {
    this.restaurant_selected = this.restaurant.getSelectedRestaurant()
      .subscribe((restaurante: Restaurant | null) => {
      this.restaurante = restaurante;
      if (this.restaurante) {
        this.restaurant_Information = this.restaurant.obtenerInformacionRestaurantes(this.restaurante?.id)
          .subscribe((information) => {
            this.informacion = information.information;
            this.dataSource = this.informacion.weekdayDescriptions.map(description => ({
              day: this.getDescriptionDay(description),
              hours: this.getDescriptionHours(description)
            }));
          });
      }
    });
  }

  ngOnDestroy() {
    if (this.restaurant_Information) {
      this.restaurant_Information.unsubscribe();
    }

    if (this.restaurant_selected) {
      this.restaurant_selected.unsubscribe();
    }

    if (this.enviarRutaSubscription) {
      this.enviarRutaSubscription.unsubscribe();
    }
  }

  getDescriptionDay(description: string): string {
    const splitDescription = description.split(': ');
    return splitDescription[0];
  }

  getDescriptionHours(description: string): string {
    const splitDescription = description.split(': ');
    return splitDescription[1];
  }

  close(){
    this.restaurant.setSelectedRestaurant(null);
    this.router.navigateByUrl('recomendaciones');
  }

  protected readonly environment = environment;
}
