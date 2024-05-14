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
  enviarRutaSubscription: Subscription | undefined;
  @Output() restauranteClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() restaurante: Restaurant | undefined;
  @Input() isSelected = false;
  @Input() ubication: any;
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

  protected readonly environment = environment;
}
