import { environment } from '../../environments/environment.prod';
import { IUsuario } from '../interfaces/doctorlist.interface';

export class Hospital {
 constructor(
    public name  : string,
    public img? : string,
    public usuario? : IUsuario,
    public id? : string
 ){

 }

 getURLImg()
 {
    if (!this.img){
      return `${environment.urlApi}/download/hospital/img-no`

    }
    else return  `${environment.urlApi}/download/hospital/${this.img}`;
 }

}