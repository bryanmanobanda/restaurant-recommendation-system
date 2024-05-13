import {Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RestaurantService} from '../services/restaurant.service';
import {Router} from '@angular/router';
import {map, Subscription} from "rxjs";
import Restaurant from "../../Modelo/restaurante.interface";
import {SecurityService} from "../services/security.service";
import {MatChipEvent, MatChipListbox, MatChipListboxChange, MatChipOption} from "@angular/material/chips";

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit, OnDestroy {
  @ViewChild('cuisineList') cuisineList: MatChipListbox;
  @ViewChild('rateList') rateList: MatChipListbox;
  @ViewChild('priceList') priceList: MatChipListbox;

  cocinasPrimarias: string[] = [];
  rating: number[] = [];
  price_level: string[] = [];
  filteredRestaurants: Restaurant[] = [];
  price_levels: string[] = [];
  filterForm: FormGroup;
  selectedCuisines: string[] = [];
  listaRestaurantesSubscription: Subscription | undefined;
  listaRestaurantes: Restaurant[]
  selectedRating:number
  selectedPrice:string
  max = 50;
  value = 5;

  constructor(private fb: FormBuilder, private fs: RestaurantService, private router: Router, private ss:SecurityService) {
  }

  ngOnInit() {
    this.listaRestaurantes = this.fs.listRestaurants
    this.iniciarFiltros()
    console.log(this.listaRestaurantes)
  }

  iniciarFiltros(){

    this.listaRestaurantes.forEach(restaurant => {
      if (restaurant.primaryCuisine && !this.cocinasPrimarias.includes(restaurant.primaryCuisine)) {
        this.cocinasPrimarias.push(restaurant.primaryCuisine);
      }

      const entero = Math.floor(restaurant.rating);

      if (entero && !this.rating.includes(entero)) {
        this.rating.push(entero);
      }

      if (restaurant.priceLevel && !this.price_level.includes(restaurant.priceLevel)) {
        this.price_level.push(restaurant.priceLevel);
      }
    });
  }

  ngOnDestroy(){
    if (this.listaRestaurantesSubscription){
      this.listaRestaurantesSubscription.unsubscribe()
    }
  }

  buscar() {
    const selectedItems: any = {
      ratings: this.rateList?.value || ' ',
      prices: this.priceList?.value || ' ',
      cuisines: this.cuisineList?.value || [],
      uid: this.ss.turista.uid,
      filter_number: this.cuisineList?.value ? this.cuisineList?.value.length : 0  + this.rateList?.value ? 1:0 + this.priceList?.value ? 1:0
    };
console.log(selectedItems)
    this.fs.enviarDatosAlBackend(selectedItems).subscribe(
      (response) => {
        console.log('Datos enviados correctamente al backend', response);
        this.fs.aplicarFiltros(selectedItems);
        this.router.navigateByUrl('recomendaciones');
      }
    );
  }

  getStarIcons(entero: number): string[] {
    let icons: string[] = [];

    for (let i = 0; i < entero; i++) {
      icons.push('star');
    }

    while (icons.length < 5) {
      icons.push('star_border');
    }

    return icons;
  }

  getMoneyIcons(entero: number): string[] {
    let icons: string[] = [];

    for (let i = 0; i < entero; i++) {
      icons.push('attach_money');
    }

    return icons;
  }

  close(){
    this.fs.updateFilterNumber(0)
    this.router.navigateByUrl('recomendaciones');
  }

  protected readonly String = String;
}
