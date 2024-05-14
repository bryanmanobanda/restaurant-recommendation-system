import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {environment} from "../environment/environment";
declare var google: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('mapContainer', {static: false}) mapContainer!: ElementRef;

  title = 'client';

  loadMap() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.GOOGLE_API}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }
  initMap() {}
  ngOnInit(): void {
    (window as any).initMap = () => this.initMap();
    this.loadMap()
  }

  protected readonly environment = environment;

}
