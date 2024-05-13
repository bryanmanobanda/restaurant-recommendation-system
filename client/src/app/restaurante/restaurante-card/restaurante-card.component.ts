import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import Restaurant from "../../../Modelo/restaurante.interface";
import {environment} from "../../../environment/environment";
import {RestaurantService} from "../../services/restaurant.service";
import {Subscription} from "rxjs";
import {Nivel_Precio} from "../../../enum/nivel_precio.enum";
import {Especialidades} from "../../../enum/especialidades.enum";

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

    obtenerEspecialidadEnEspanol(especialidad: string): string {
        return Especialidades[especialidad as keyof typeof Especialidades] || especialidad;
    }

    obtenerNivelPrecioEnEspanol(nivel_precio: string): string {
        return Nivel_Precio[nivel_precio as keyof typeof Nivel_Precio] || nivel_precio;
    }

  protected readonly environment = environment;
}
