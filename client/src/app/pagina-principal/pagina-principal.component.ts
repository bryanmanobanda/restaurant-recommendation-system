import {Component, OnDestroy, OnInit} from '@angular/core';
import {SecurityService} from "../services/security.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {Turista} from "../../Modelo/turista.interface";

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss']
})
export class PaginaPrincipalComponent implements OnInit ,OnDestroy{
  user:Turista
  userSubscriber:Subscription
  constructor(private ss: SecurityService, private router: Router) {
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
}
