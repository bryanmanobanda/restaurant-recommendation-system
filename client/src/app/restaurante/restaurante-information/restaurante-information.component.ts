import {Component, OnDestroy, OnInit} from '@angular/core';
import Restaurant from "../../../Modelo/restaurante.interface";
import {RestaurantService} from "../../services/restaurant.service";
import {Subscription} from "rxjs";
import {environment} from "../../../environment/environment";
import Information from "../../../Modelo/informacion.interface";
import {UbicationService} from "../../services/ubication.service";

@Component({
  selector: 'app-restaurante-information',
  templateUrl: './restaurante-information.component.html',
  styleUrls: ['./restaurante-information.component.scss']
})
export class RestauranteInformationComponent implements OnInit, OnDestroy {
  restaurant_Information: Subscription | undefined;
  restaurant_selected: Subscription | undefined;
  enviarRutaSubscription: Subscription | undefined;
  restaurante: Restaurant | null = null;
  informacion: Information;
  displayedColumns = ['day', 'hours'];
  dataSource = [{day: "", hours: ""}];

  constructor(private restaurant: RestaurantService, private ubication: UbicationService) {
  }

  ngOnInit(): void {
    this.restaurant_selected = this.restaurant.getSelectedRestaurant().subscribe((restaurante: Restaurant | null) => {
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

  mostrarRuta(id: any): void {
    this.enviarRutaSubscription = this.restaurant.obtenerRutaRestaurante(id, this.ubication.pos, "")
      .subscribe({
        next: (data) => {
          this.restaurant.enviarRuta(data.route);
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete')
      });
  }

  getStarIcons(numeroEstrellas: number): string[] {
    const entero = Math.floor(numeroEstrellas);
    const decimal = numeroEstrellas - entero;
    let icons: string[] = [];

    for (let i = 0; i < entero; i++) {
      icons.push('star');
    }

    if (decimal > 0 && decimal < 0.75) {
      icons.push('star_half');
    }

    if (decimal >= 0.75) {
      icons.push('star');
    }

    while (icons.length < 5) {
      icons.push('star_border');
    }

    return icons;
  }

  getPriceLevelDescription(priceLevel: string | undefined): string | undefined {
    switch (priceLevel) {
      case 'PRICE_LEVEL_FREE':
        return 'Gratis';
      case 'PRICE_LEVEL_INEXPENSIVE':
        return 'Económico';
      case 'PRICE_LEVEL_MODERATE':
        return 'Moderado';
      case 'PRICE_LEVEL_EXPENSIVE':
        return 'Costoso';
      case 'PRICE_LEVEL_VERY_EXPENSIVE':
        return 'Muy costoso';
      default:
        return undefined;
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

  protected readonly environment = environment;
}
