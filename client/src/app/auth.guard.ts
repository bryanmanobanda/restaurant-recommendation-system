import {CanActivateChildFn, CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {SecurityService} from "./services/security.service";
import {map} from "rxjs";

export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const authObs$ = inject(SecurityService).authState$;
  return authObs$.pipe(
    map((user) => {
      if(!user){
        router.navigateByUrl("acceso")
        return false
      }
      return true
    })
  )
};

export const accesoGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authObs$ = inject(SecurityService).authState$;
  return authObs$.pipe(
    map((user) => {
      if(user){
        router.navigateByUrl("recomendaciones")
        return false
      }
      return true
    })
  )
};
