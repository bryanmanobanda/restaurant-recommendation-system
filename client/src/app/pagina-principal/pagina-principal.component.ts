import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SecurityService} from "../services/security.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Turista} from "../../Modelo/turista.interface";
import {MapaComponent} from "../mapa/mapa.component";
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {RestaurantService} from "../services/restaurant.service";
import Restaurant from "../../Modelo/restaurante.interface";

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss']
})
export class PaginaPrincipalComponent implements OnInit ,OnDestroy{
  user:Turista
  userSubscriber:Subscription

  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild(MapaComponent) mapaComponent!: MapaComponent;
  constructor(private ss: SecurityService, private router: Router, private filter: RestaurantService) {
  }

  ngOnInit(){
    this.userSubscriber = this.ss.authState$.
    subscribe(
      (result)=>{
        //console.log("tokenid", result?.getIdToken().then(value => console.log(value)))
        //console.log(result?.user.UserImpl.accessToken)
        this.ss.turista = {
          uid: result?.uid,
          nombre: result?.displayName,
          correo: result?.email,
          foto: result?.photoURL,
          cocina: {},
          calidad_servicio: {},
          nivel_precio: {}
        }
        this.user = this.ss.turista
        console.log(this.user)
      })

      if (this.tabGroup && this.filter.userProfile) {
          this.tabGroup.selectedIndex = this.filter.userProfile ? 0 : 1;
      }

     /* if (this.filter.userProfile){
         this.tabGroup.selectedIndex=0
          //this.onTabChange()
      }else{
        this.tabGroup.selectedIndex=1
      }*/
  }

  ngOnDestroy() {
    if(this.userSubscriber){
      this.userSubscriber.unsubscribe()
    }
  }

  async logOut(): Promise<void>{
    try{
      await this.ss.logOut()
      await this.router.navigateByUrl("acceso")
    }catch(error){
      console.error(error)
    }

  }

  onTabChange(event: MatTabChangeEvent) {
    // Obtener el índice de la pestaña activa
    const tabIndex = event.index;
    // Obtener la lista de restaurantes correspondiente a la pestaña activa
    const listaRestaurantes:Restaurant[] = this.obtenerListaRestaurantesPorTab(tabIndex);
    // Actualizar los marcadores del mapa con la lista de restaurantes actualizada
    this.mapaComponent.updateMarkers(listaRestaurantes);
  }

  obtenerListaRestaurantesPorTab(index: number): Restaurant[] {
    if (index === 0) {
            return this.filtrarRestaurantesSegunPerfil(
              this.filter.obtenerListaRestaurantes(),
              this.filter.userProfile
            );
      }
    else {
        return this.filtrarRestaurantesSegunPerfil2(
            this.filter.obtenerListaRestaurantes(),
            this.filter.userProfile
        );
    }
  }
  private filtrarRestaurantesSegunPerfil(
    restaurantes: Restaurant[],
    user_Profile: Turista
  ): Restaurant[] {
    if (!user_Profile) {
      console.log("No se ha cargado el perfil")
      return restaurantes; // Si no se ha cargado el perfil, mostrar todos los restaurantes
    }
    const preferencias = user_Profile.cocina;
    if (!preferencias || Object.keys(preferencias).length === 0) {
      console.log("No existen preferencoas")
      return restaurantes; // Si no hay preferencias definidas, mostrar todos los restaurantes
    }
    console.log("Existen preferencias")
    const preferenciasKeys = Object.keys(preferencias);
    console.log(preferenciasKeys)
    return restaurantes.filter((restaurante) =>
      preferenciasKeys.includes(restaurante.primaryCuisine)
    );

  }

    private filtrarRestaurantesSegunPerfil2(
        restaurantes: Restaurant[],
        user_Profile: Turista
    ): Restaurant[] {
        if (!user_Profile) {
            console.log("No se ha cargado el perfil")
            return restaurantes; // Si no se ha cargado el perfil, mostrar todos los restaurantes
        }
        const preferencias = user_Profile.cocina;
        if (!preferencias || Object.keys(preferencias).length === 0) {
            console.log("No existen preferencoas")
            return restaurantes; // Si no hay preferencias definidas, mostrar todos los restaurantes
        }
        console.log("Existen preferencias")
        const preferenciasKeys = Object.keys(preferencias);
        console.log(preferenciasKeys)
        return restaurantes.filter((restaurante) =>
            !preferenciasKeys.includes(restaurante.primaryCuisine)
        );
    }
}

