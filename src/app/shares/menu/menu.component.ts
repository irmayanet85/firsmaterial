import { Component, EventEmitter, Output } from '@angular/core';
import { Usuario } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Output() newclick = new EventEmitter<string>();
  public user!: Usuario;

  constructor (private authServ: AuthService){
    if (this.authServ){

      this.user = this.authServ.user;
    }

  }

  toggle(){
    this.newclick.emit('click');
    //console.log('me dieron click');

  }

}
