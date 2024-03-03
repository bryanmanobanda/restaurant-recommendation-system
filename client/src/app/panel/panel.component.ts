import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {MapaComponent} from "../mapa/mapa.component";
import {UbicationService} from "../services/ubication.service";
import {SecurityService} from "../services/security.service";
import {Router} from "@angular/router";
import {RestaurantService} from "../services/restaurant.service";
import Restaurant from "../../Modelo/restaurante.interface";
import {Turista} from "../../Modelo/turista.interface";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements  OnInit, AfterViewInit{
  thumbLabel = false;
  value = 5;
  max = 50;
  min = 5;
  step = 5;
  metric = "km"
  search = "5 km"
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild(MapaComponent) mapaComponent!: MapaComponent;
  selectedTabIndex: number = 0;
  reloadTabs: boolean = false; // Variable para controlar la recarga de los tabs

  constructor(private ubication: UbicationService, private ss: SecurityService, private router: Router, private filter: RestaurantService) {
  }

  ngOnInit() {
    this.value = 5
    this.metric = "km"
    this.search = this.filter.radio
  }

  ngAfterViewInit() {
    //this.tabGroup.focusTab(1)
  }

  searchRestaurants(){
    let distance = (this.metric === 'km') ? (this.value * 1000) : this.value;
    this.search = distance + this.metric
    this.filter.radio = this.search
    this.filter.obtenerRestaurantes(this.ubication.pos,this.ss.turista.uid , distance)
      .subscribe(data => {
        console.log(data)
        this.filter.setTurista(data.user_Profile)
        this.filter.actualizarListaRestaurantes(data);
        this.ubication.updateCircleRadius(distance);
        this.selectedTabIndex = 1;
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

  onTabChange(event: MatTabChangeEvent) {
    const tabIndex = event.index;
    const listaRestaurantes:Restaurant[] = this.obtenerListaRestaurantesPorTab(tabIndex);
    this.filter.setListaSecundaria(listaRestaurantes);
    //this.mapaComponent.updateMarkers(listaRestaurantes);
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
