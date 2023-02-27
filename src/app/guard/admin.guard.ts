import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService, private ruta : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean >  {
      console.log('AdminGuard Can Active');
      if (this.auth.user.rol == environment.role.admin) {
        return of(true);
      } else {
        this.ruta.navigate(['./forbidden'])
        return of(false)
      }
              

  }
  canLoad(route: Route,segments: UrlSegment[]): Observable<boolean>  | boolean  {
    console.log('AdminGuard Can Load');
      if (this.auth.user.rol == environment.role.admin) {
        return of(true);
      } 
      else {
        this.ruta.navigate(['./forbidden'])
        return of(false)
      }
    
  }
}
