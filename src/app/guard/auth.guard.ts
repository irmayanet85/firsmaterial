import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authServ: AuthService, private rute: Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean >  {
      return this.authServ.ValidateAuthAndrenewToken()
      .pipe(
        tap(result=>{
          console.log('CanActivate',result);
          if(result == false){
            this.rute.navigate(['./login'])
            
          }
         
        })
      );
  }
  
}
