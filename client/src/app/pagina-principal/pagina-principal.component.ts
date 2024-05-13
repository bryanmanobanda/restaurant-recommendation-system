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
  thumbLabel = false;
  value = 0;

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
        this.filter.setTurista(this.user)
        console.log(this.user)
      })
  }

  ngOnDestroy() {
    if(this.userSubscriber){
      this.userSubscriber.unsubscribe()
    }
  }
}
