import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Usuario } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-menu-submenu',
  templateUrl: './menu-submenu.component.html',
  styleUrls: ['./menu-submenu.component.css']
})
export class MenuSubmenuComponent  {
  public user!: Usuario;
  public login : boolean = false;
  
  

  constructor (private authServ: AuthService, private route: Router){
    this.authServ.ValidateAuthAndrenewToken().subscribe();
    this.authServ.session.subscribe(data=> {
      this.user = data.dataUser;
      this.login = data.status;
      console.log('session menusubmenu');
    })

  }
   
  
  

  logout(){
    this.authServ.logout();
    //this.login = false;
    console.log("cerrando session");
    this.route.navigateByUrl('/dashboard');
  }
 

}
