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
  public listRestaurants: Restaurant[] = [];
  public listaSecundaria: Restaurant[] = [];
  private listaSecundariaSubject: Subject<Restaurant[]> = new Subject<Restaurant[]>();

  private listaRestaurantesSubject: Subject<Restaurant[]> = new Subject<Restaurant[]>();
  private rutaSubject: Subject<Routes> = new Subject<Routes>();
  private selectedRestaurantSubject: BehaviorSubject<Restaurant | null> = new BehaviorSubject<Restaurant | null>(null);
  userProfile: Turista
  private filterNumberSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  filterNumber$: Observable<number> = this.filterNumberSubject.asObservable();
  public radio="5 km"
  public filter_number = 0

  selectedRestaurant$: Observable<Restaurant | null> = this.selectedRestaurantSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  enviarDatosAlBackend(data: any): Observable<any> {
    console.log(data)
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
    this.listRestaurants = this.listaRestaurantes
    this.listaRestaurantesSubject.next(this.listaRestaurantes);
  }

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
    console.log("lista restaurantes filtros", this.listRestaurants)

    this.filterNumberSubject.next(preferencias.filter_number);
    if (preferencias?.cuisines && preferencias?.cuisines.length > 0 && preferencias?.cuisines != ' ') {
      this.listaRestaurantes = this.listaRestaurantes.filter(restaurant => {
        return preferencias.cuisines.includes(restaurant.primaryCuisine);
      });
    }

    if (preferencias?.prices && preferencias?.prices != ' ' ) {
      this.listaRestaurantes = this.listaRestaurantes.filter(restaurant => {
        return restaurant.priceLevel === preferencias?.prices;
      });
    }

    if (preferencias?.ratings && preferencias?.ratings != ' ') {
      this.listaRestaurantes = this.listaRestaurantes.filter(restaurant => {
        return restaurant.rating >= preferencias.ratings;
      });
    }
    console.log("lista restaurantes filtros aplicados", this.listRestaurants)
    this.listaRestaurantesSubject.next(this.listaRestaurantes);
  }

  cleanFilter(){
    this.filterNumberSubject.next(0);
    this.listaRestaurantes = this.listRestaurants
    console.log("clean",this.listaRestaurantes)
    this.listaRestaurantesSubject.next(this.listRestaurants);
  }

  updateFilterNumber(number: number): void {
    this.filterNumberSubject.next(number);
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
      foto: user.foto || "",
      calidad_servicio: user.calidad_servicio,
    }
  }
}
