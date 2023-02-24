import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-menu-submenu',
  templateUrl: './menu-submenu.component.html',
  styleUrls: ['./menu-submenu.component.css']
})
export class MenuSubmenuComponent implements OnInit {
  public user!: Usuario;
  public active : boolean = false;
  constructor (private servAuth: AuthService){
    servAuth.ValidateAuthAndrenewToken().subscribe( (result) => {
      if (result == true) {
        this.user = servAuth.user;
        this.active = true;
      }
      else{
        this.active = false;
      }
      //console.log('result', result);
    
    });
  }

  logout(){
    this.servAuth.logout();
    this.active=false;
    console.log("cerrando session");
  }
  ngOnInit(): void {
    //console.log(this.user);
  }

}
