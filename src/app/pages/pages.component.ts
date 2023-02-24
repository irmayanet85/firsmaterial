import { Component } from '@angular/core';
import { Usuario } from '../models/user.models';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent {

  public user!: Usuario;

  constructor (private authServ: AuthService) {
    if (this.authServ){

      this.user = this.authServ.user;
    }

  }


}
