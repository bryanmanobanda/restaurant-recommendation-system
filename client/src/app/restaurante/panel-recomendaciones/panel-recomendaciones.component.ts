import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {SecurityService} from "../../services/security.service";
import {Router} from "@angular/router";
import {RestaurantService} from "../../services/restaurant.service";
import Restaurant from "../../../Modelo/restaurante.interface";
import {Turista} from "../../../Modelo/turista.interface";
import {MapaComponent} from "../../mapa/mapa.component";
import {UbicationService} from "../../services/ubication.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-panel-recomendaciones',
  templateUrl: './panel-recomendaciones.component.html',
  styleUrls: ['./panel-recomendaciones.component.scss']
})
export class PanelRecomendacionesComponent implements  OnInit{
  filterNumberSubscription: Subscription
  selectedTabIndex: number = 0;
  search = "5 km"
  metric = "km"
  value = 5;
  max = 50;
  min = 5;
  step = 5;
  tabs:string[] = []

  constructor(private ubication: UbicationService, private ss: SecurityService, private router: Router, private filter: RestaurantService) {
  }

  ngOnInit() {
    this.value = 5
    this.metric = "km"
    this.search = this.filter.radio
    this.filterNumberSubscription = this.filter.filterNumber$.subscribe(
      (filterNumber) => {
        this.tabs = filterNumber > 0 ? ['Restaurantes filtrados'] : ['Para ti', "Cerca de ti"]
      }
    );
  }

  ngOnDestroy() {
    if (this.filterNumberSubscription)
      this.filterNumberSubscription.unsubscribe()
  }

  searchRestaurants(){
    let distance = (this.metric === 'km') ? (this.value * 1000) : this.value;
    this.search = this.value + " " + this.metric
    this.filter.radio = this.search
    this.filter.obtenerRestaurantes(this.ubication.pos,this.ss.turista.uid , distance)
      .subscribe(data => {
        console.log(data)
        this.filter.actualizarListaRestaurantes(data);
        this.ubication.updateCircleRadius(distance);
        this.selectedTabIndex = 0;
      })
  }

  setMetrics(metric:any){
    if(metric === 'meters'){
      this.max = 1000;
      this.min = 100;
      this.step = 100;
      this.value = 100;
      this.metric = 'm';
    }else{
      this.max = 50;
      this.min = 5;
      this.step = 5;
      this.value = 5;
      this.metric = 'km';
    }
  }
}
