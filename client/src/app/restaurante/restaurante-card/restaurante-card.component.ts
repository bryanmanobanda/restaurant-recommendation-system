import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import Restaurant from "../../../Modelo/restaurante.interface";
import {environment} from "../../../environment/environment";
import {RestaurantService} from "../../services/restaurant.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-restaurante-card',
  templateUrl: './restaurante-card.component.html',
  styleUrls: ['./restaurante-card.component.scss']
})
export class RestauranteCardComponent implements OnDestroy {
  @Input() restaurante: Restaurant | undefined;
  @Input() ubication: any;
  @Input() isSelected = false;
  @Output() restauranteClicked: EventEmitter<any> = new EventEmitter<any>();
  enviarRutaSubscription: Subscription | undefined;
  isHovered = false;

  constructor(private restaurant: RestaurantService) {
  }

  ngOnDestroy() {
    if (this.enviarRutaSubscription) {
      this.enviarRutaSubscription.unsubscribe()
    }
  }

  onCardClick(): void {
    this.restauranteClicked.emit(this.restaurante);
  }

  mostrarRuta(id: any, travel:string): void {
    this.enviarRutaSubscription = this.restaurant.obtenerRutaRestaurante(id, this.ubication, travel)
      .subscribe(
          (data) => {
          this.restaurant.enviarRuta(data.route);
      });
  }

  highlightCard(isHighlighted: boolean): void {
    this.isHovered = isHighlighted;
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

  protected readonly environment = environment;
}
