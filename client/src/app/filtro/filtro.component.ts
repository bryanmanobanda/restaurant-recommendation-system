import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RestaurantService} from '../services/restaurant.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";
import Restaurant from "../../Modelo/restaurante.interface";
import {SecurityService} from "../services/security.service";
@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit, OnDestroy {
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

  constructor(private fb: FormBuilder, private fs: RestaurantService, private router: Router, private ss:SecurityService) {
  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      rating: [''],
      price_level: [''],
    })
    this.listaRestaurantes = this.fs.obtenerListaRestaurantes()
    console.log(this.listaRestaurantes)

    this.iniciarFiltros()
this.actualizarFiltros()
  }

  iniciarFiltros(){

    this.listaRestaurantes.forEach(restaurant => {
      if (restaurant.primaryCuisine && !this.cocinasPrimarias.includes(restaurant.primaryCuisine)) {
        this.cocinasPrimarias.push(restaurant.primaryCuisine);
      }

      if (restaurant.rating && !this.rating.includes(restaurant.rating)) {
        this.rating.push(restaurant.rating);
      }

      if (restaurant.priceLevel && !this.price_level.includes(restaurant.priceLevel)) {
        this.price_level.push(restaurant.priceLevel);
      }
    });
  }


  actualizarFiltros() {
    this.filterForm.get('rating')?.valueChanges.subscribe(selectedRating => {
      console.log(typeof(parseInt(selectedRating)))
      this.selectedRating = parseInt(selectedRating)
      this.actualizarCocinas(this.selectedRating, this.selectedPrice);
    });

    this.filterForm.get('price_level')?.valueChanges.subscribe(selectedPriceLevel => {
      this.selectedPrice = selectedPriceLevel
      console.log(typeof(selectedPriceLevel))
      this.actualizarCocinas(this.selectedRating, this.selectedPrice);
    });
  }

  actualizarCocinas(selectedRating: number | null, selectedPriceLevel: string | null) {
    console.log("cocinas");
    console.log(selectedPriceLevel);
    console.log(selectedRating);

    this.filteredRestaurants = this.listaRestaurantes;

    if (selectedRating !== null) {
      this.filteredRestaurants = this.filteredRestaurants.filter(restaurant => restaurant.rating >= selectedRating);
      this.price_levels = this.filteredRestaurants
        .map(restaurant => restaurant.priceLevel)
        .filter((value, index, self) => self.indexOf(value) === index);

      console.log(this.price_levels);
    }

    if (selectedPriceLevel !== null) {
      this.filteredRestaurants = this.filteredRestaurants.filter(restaurant => restaurant.priceLevel === selectedPriceLevel);
      this.rating = this.filteredRestaurants
        .map(restaurant => restaurant.rating)
        .filter((value, index, self) => self.indexOf(value) === index);

      console.log(this.rating);
    }

    this.cocinasPrimarias = this.filteredRestaurants
      .map(restaurant => restaurant.primaryCuisine)
      .filter((value, index, self) => self.indexOf(value) === index);

    console.log(this.cocinasPrimarias);
  }

  ngOnDestroy(){
    if (this.listaRestaurantesSubscription){
      this.listaRestaurantesSubscription.unsubscribe()
    }
  }

  toggleCuisine(cuisine: string) {
    const index = this.selectedCuisines.indexOf(cuisine);
    if (index === -1) {
      this.selectedCuisines.push(cuisine);
    } else {
      this.selectedCuisines.splice(index, 1);
    }
    this.actualizarValoresPrecioRating();
  }

  actualizarValoresPrecioRating() {
    const filteredRestaurants = this.selectedCuisines.length > 0 ?
      this.listaRestaurantes.filter(restaurant => this.selectedCuisines.includes(restaurant.primaryCuisine)) :
      (this.listaRestaurantes = this.fs.obtenerListaRestaurantes());

    this.cocinasPrimarias = filteredRestaurants.map(restaurant => restaurant.primaryCuisine)
    this.rating = filteredRestaurants.map(restaurant => restaurant.rating);
    this.price_level = filteredRestaurants.map(restaurant => restaurant.priceLevel);

    this.rating = Array.from(new Set(this.rating)).sort((a, b) => a - b);
    this.price_level = Array.from(new Set(this.price_level)).sort();
    this.cocinasPrimarias = Array.from(new Set(this.cocinasPrimarias)).sort();
  }

  buscar() {
    const formData = {
        rating: this.filterForm.value.rating,
        nivelPrecio: this.filterForm.value.price_level,
        cocina: this.selectedCuisines,
        uid: this.ss.turista.uid
    };
    console.log(formData)
    this.fs.enviarDatosAlBackend(formData).subscribe(
      (response) => {
        console.log('Datos enviados correctamente al backend', response);
        this.fs.aplicarFiltros(formData);
        this.router.navigateByUrl('recomendaciones');
      },
      (error) => {
        console.error('Error al enviar datos al backend', error);
      }
    );
  }

  close(){
    this.router.navigateByUrl('recomendaciones');
  }
}
