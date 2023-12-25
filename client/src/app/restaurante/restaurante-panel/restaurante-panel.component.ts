import {Component, OnDestroy, OnInit} from '@angular/core';
import {UbicationService} from "../../services/ubication.service";
import {FilterService} from "../../services/filter.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-restaurante-panel',
  templateUrl: './restaurante-panel.component.html',
  styleUrls: ['./restaurante-panel.component.scss']
})
export class RestaurantePanelComponent implements OnInit, OnDestroy {
  listaRestaurantes: any[] = [];
  listRestaurantsSubscription: Subscription | undefined;

  constructor(private ubication: UbicationService, private filter: FilterService) {
  }

  ngOnInit(): void {
    this.fetchRestaurantes();
  }

  ngOnDestroy() {
    if (this.listRestaurantsSubscription) {
      this.listRestaurantsSubscription.unsubscribe();
    }
  }

  private fetchRestaurantes(): void {
    console.log(this.ubication.pos);
    this.listRestaurantsSubscription = this.filter.obtenerRestaurantes(this.ubication.pos)
      .subscribe(
        (data) => {
          this.filter.actualizarListaRestaurantes(data);
          this.listaRestaurantes = this.filter.obtenerListaRestaurantes();
          console.log(this.listaRestaurantes[0]?.photos[0]?.name);

        }
      );
  }
}
