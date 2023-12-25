import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import Restaurant from "../../../Modelo/restaurante.interface";
import {environment} from "../../../environment/environment";

@Component({
  selector: 'app-restaurante-card',
  templateUrl: './restaurante-card.component.html',
  styleUrls: ['./restaurante-card.component.scss']
})
export class RestauranteCardComponent{
  @Input() restaurante: Restaurant | undefined;
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
