import { environment } from '../../environments/environment.prod';
import { IHopitalReduce, IUsuario } from '../interfaces/doctorlist.interface';
export class Doctor {
 constructor(
    public name  : string,
    public img? : string,
    public usuario? : IUsuario,
    public id? : string,
    public hospitales? : IHopitalReduce[],
 ){

 }

 getURLImg()
 {
    if (!this.img){
      return `${environment.urlApi}/download/medico/img-no`

    }
    else return  `${environment.urlApi}/download/medico/${this.img}`;
 }

}