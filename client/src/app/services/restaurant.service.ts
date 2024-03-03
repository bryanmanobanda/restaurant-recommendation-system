import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from "../../environment/environment";
import Restaurant from "../../Modelo/restaurante.interface";
import Routes from "../../Modelo/ruta.interface";
import {Turista} from "../../Modelo/turista.interface";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private listaRestaurantes: Restaurant[] = [];
  public listaSecundaria: Restaurant[] = [];
  private listaRestaurantesSubject: Subject<Restaurant[]> = new Subject<Restaurant[]>();
  private rutaSubject: Subject<Routes> = new Subject<Routes>();
  private selectedRestaurantSubject: BehaviorSubject<Restaurant | null> = new BehaviorSubject<Restaurant | null>(null);
  userProfile: Turista
  public radio="5 km"

  selectedRestaurant$: Observable<Restaurant | null> = this.selectedRestaurantSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  enviarDatosAlBackend(data: any): Observable<any> {
    return this.http.post<any>(`${environment.BASE_URL}/preferences`, data);
  }

  obtenerRestaurantes(location: any, uid: String | undefined, radio:number): Observable<any> {
    const data = {uid, location, radio}
    console.log(data)
    return this.http.post<any>(`${environment.BASE_URL}/api/restaurants`, data);
  }

  obtenerInformacionRestaurantes(id_Restaurante: any): Observable<any> {
    let id = {id: `${id_Restaurante}`};
    return this.http.post<any>(`${environment.BASE_URL}/api/information`, id);
  }

  obtenerRutaRestaurante(id: any, ubication: any, travelMode: any): Observable<any> {
    const data = {
      "location": {
        "latLng": {
          "latitude": ubication.lat,
          "longitude": ubication.lng
        }
      },
      "placeId": id,
      travelMode
    }

    return this.http.post<any>(`${environment.BASE_URL}/api/routes`, data);
  }

  obtenerListaRestaurantes(): Restaurant[] {
    return this.listaRestaurantes;
  }

  actualizarListaRestaurantes(data: any): void {
    this.listaRestaurantes = data.restaurants || [];
    this.listaRestaurantesSubject.next(this.listaRestaurantes);
  }

  private listaSecundariaSubject: Subject<Restaurant[]> = new Subject<Restaurant[]>();

  setListaSecundaria(data: Restaurant[]): void {
    this.listaSecundaria = data;
    this.listaSecundariaSubject.next(data);
  }

  obtenerListaSecundariaObservable(): Observable<Restaurant[]> {
    return this.listaSecundariaSubject.asObservable();
  }

  obtenerListaRestaurantesObservable(): Observable<Restaurant[]> {
    return this.listaRestaurantesSubject.asObservable();
  }

  aplicarFiltros(preferencias: any): void {
    this.listaSecundariaSubject.next(this.listaRestaurantes);
    // Aplica los filtros de cocina
    if (preferencias.cocina && preferencias.cocina.length > 0) {
      this.listaRestaurantes = this.listaRestaurantes.filter(restaurant => {
        return preferencias.cocina.includes(restaurant.primaryCuisine);
      });
    }

    // Aplica el filtro de precio
    if (preferencias.nivelPrecio) {
      this.listaRestaurantes = this.listaRestaurantes.filter(restaurant => {
        return restaurant.priceLevel === preferencias.nivelPrecio;
      });
    }

    // Aplica el filtro de rating
    if (preferencias.servicio) {
      this.listaRestaurantes = this.listaRestaurantes.filter(restaurant => {
        return restaurant.rating >= preferencias.servicio;
      });
    }

    // Después de aplicar los filtros, emite la lista actualizada
    this.listaRestaurantesSubject.next(this.listaRestaurantes);
  }

  setSelectedRestaurant(restaurant: Restaurant | null): void {
    this.selectedRestaurantSubject.next(restaurant);
  }

  getSelectedRestaurant(): Observable<Restaurant | null> {
    return this.selectedRestaurant$;
  }

  enviarRuta(ruta: Routes): void {
    this.rutaSubject.next(ruta);
  }

  recibirRuta(): Observable<Routes> {
    return this.rutaSubject.asObservable();
  }

  setTurista(user:any){
    this.userProfile = {
      uid: user.uid,
      nombre: user.nombre,
      correo: user.correo,
      nivel_precio: user.nivel_precio,
      cocina: user.cocina,
      foto: "",
      calidad_servicio: user.calidad_servicio,
    }
  }

}
