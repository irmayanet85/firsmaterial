import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Usuario } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() newclick = new EventEmitter<string>();
  email: string = '';
  rol: string = '';
  active : boolean = false;
 

  constructor (private authServ: AuthService){

    this.authServ.session.subscribe(data=> {
      this.email = data.dataUser.email;
      this.rol = data.dataUser.rol!;
      this.active = data.status;
      console.log('session menu');
    })
  }

  toggle(){
    this.newclick.emit('click');
    //console.log('me dieron click');

  }

 

}
