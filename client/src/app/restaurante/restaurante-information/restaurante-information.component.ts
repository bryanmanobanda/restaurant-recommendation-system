import {Component, OnDestroy, OnInit} from '@angular/core';
import Restaurant from "../../../Modelo/restaurante.interface";
import {RestaurantService} from "../../services/restaurant.service";
import {Subscription} from "rxjs";
import {environment} from "../../../environment/environment";
import Information from "../../../Modelo/informacion.interface";
import {UbicationService} from "../../services/ubication.service";
import {Router} from "@angular/router";
import {Especialidades} from "../../../enum/especialidades.enum";
import {Nivel_Precio} from "../../../enum/nivel_precio.enum";

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

  constructor(private restaurant: RestaurantService, private ubication: UbicationService, private router:Router) {
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
/*
  mostrarRuta(id: any): void {
    this.enviarRutaSubscription = this.restaurant.obtenerRutaRestaurante(id, this.ubication.pos, "")
      .subscribe({
        next: (data) => {
          this.restaurant.enviarRuta(data.route);
        },
        error: (error) => console.error(error),
        complete: () => console.info('complete')
      });
  }*/

  mostrarRuta(id: any, travel:string): void {
    this.enviarRutaSubscription = this.restaurant.obtenerRutaRestaurante(id, this.ubication, travel)
        .subscribe(
            (data) => {
              this.restaurant.enviarRuta(data.route);
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

  obtenerEspecialidadEnEspanol(especialidad: string): string {
    return Especialidades[especialidad as keyof typeof Especialidades] || especialidad;
  }

  obtenerNivelPrecioEnEspanol(nivel_precio: string): string {
    return Nivel_Precio[nivel_precio as keyof typeof Nivel_Precio] || nivel_precio;
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
