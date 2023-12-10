import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FilterService } from '../services/filter.service';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit{
  cuisineNg: string;
  filterForm: FormGroup;
  selected: { [id: number]: boolean } = {};
  selectedCuisines: string[] = [];

  constructor(private fb: FormBuilder, private fs: FilterService, private router:Router){}

  ngOnInit(){
    this.filterForm = this.fb.group({
      rating: [''],
      price_level: [''],
    })
  }

  toggleCuisine(cuisine: string) {
    const index = this.selectedCuisines.indexOf(cuisine);
    if (index === -1) {
      this.selectedCuisines.push(cuisine);
    } else {
      this.selectedCuisines.splice(index, 1);
    }
  }

  buscar() {
    const formData = {
      servicio: this.filterForm.value.rating,
      nivelPrecio: this.filterForm.value.price_level,
      cocina: this.selectedCuisines
    };
    console.log(formData)
    this.fs.enviarDatosAlBackend(formData).subscribe(
      (response) => {
        console.log('Datos enviados correctamente al backend', response);
        this.router.navigate(['/recomendaciones']);
      },
      (error) => {
        console.error('Error al enviar datos al backend', error);
      }
    );
  }
}
