export interface Turista {
  uid: string|undefined;
  nombre: string|undefined|null;
  correo: string|undefined|null;
  foto: string|undefined|null;
  cocina: {[key: string]: number},
  calidad_servicio: {},
  nivel_precio: {}
}
