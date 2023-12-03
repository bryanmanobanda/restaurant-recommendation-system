import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { FilterService } from '../services/filter.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit{
  filterForm: FormGroup;

  constructor(private fb: FormBuilder, private fs: FilterService){}

  ngOnInit(){
    this.filterForm = this.fb.group({
      rating: [''],
      price_level: [''],
    })
  }

  get filterFormControls() {
    return this.filterForm.controls;
  }

  selectedCuisines: string[] = [];
  isHovered = '';

  toggleCuisine(cuisine: string) {
    const index = this.selectedCuisines.indexOf(cuisine);
    if (index === -1) {
      this.selectedCuisines.push(cuisine);
    } else {
      this.selectedCuisines.splice(index, 1);
    }
    console.log(this.selectedCuisines)
  }

  isSelected(cuisine: string): boolean {
    return this.selectedCuisines.includes(cuisine);
  }

  buscar() {
    // Obtener los valores del formulario
    const formData = {
      rating: this.filterForm.value.rating,
      price_level: this.filterForm.value.price_level,
      cuisines: this.selectedCuisines
    };
    console.log(formData)
    // Aquí puedes enviar formData al servicio para que lo maneje y lo envíe al backend
    this.fs.enviarDatosAlBackend(formData).subscribe(
      (response) => {
        // Manejar la respuesta del backend si es necesario
        console.log('Datos enviados correctamente al backend', response);
      },
      (error) => {
        // Manejar cualquier error en el envío de datos
        console.error('Error al enviar datos al backend', error);
      }
    );
  }


}
