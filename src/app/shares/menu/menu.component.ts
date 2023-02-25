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
 

  constructor (){}

  toggle(){
    this.newclick.emit('click');
    //console.log('me dieron click');

  }
  setdatauser(data: any) {
    this.email = data.email;
    this.rol = data.rol;
  }

}
