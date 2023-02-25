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
  @Output() data = new EventEmitter<{email?:string, rol?: string}>();
  

  constructor (private authServ: AuthService, private route: Router){
    this.authServ.ValidateAuthAndrenewToken().subscribe(result=> {
      this.user = authServ.user;
      this.login = result;
      this.data.emit({email: this.user.email, rol: this.user.rol!});

    })

    authServ.activeuser.subscribe(active => {
      this.login = active;
      this.data.emit({email: this.user.email, rol: this.user.rol!});
    })
      

    if (authServ.user){
      authServ.datauser.subscribe(user => {
      this.user = user;
      this.data.emit({email: this.user.email, rol: this.user.rol!});
      })
    }
    }
   
  
  

  logout(){
    this.authServ.logout();
    //this.login = false;
    console.log("cerrando session");
    this.route.navigateByUrl('/dashboard');
  }
 

}
