import {Pipe, PipeTransform} from '@angular/core';
import {Especialidades} from "../../../enum/especialidades.enum";
import {Nivel_Precio} from "../../../enum/nivel_precio.enum";
import {Precio_Number} from "../../../enum/precio_number.enum";

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === 'especialidad') {
      return Especialidades[value as keyof typeof Especialidades] || value;

    } else if (args === 'nivel_precio') {
      return Nivel_Precio[value as keyof typeof Nivel_Precio] || value;

    } else if (args === 'precio_number') {
      return Precio_Number[value as keyof typeof Precio_Number] || value;
    } else if (args === 'starIcons') {

      const entero = Math.floor(value);
      const decimal = value - entero;
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

    return value;
  }

}
