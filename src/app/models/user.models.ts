import { environment } from '../../environments/environment';
export class Usuario {
 constructor(
    public name  : string,
    public email : string,
    public password? : string,
    public img? : string,
    public rol? : string,
    public google? : string,
    public id? : string,
   
 ){

 }

 setName(name:string){
  this.name = name;
 }
 setEmail(email:string){
  this.email = email;
 }

 getName(){
   return this.name;
 }
 getURLImg()
 {
    if (!this.img){
      return `${environment.urlApi}/download/user/img-no`

    }
    else return  `${environment.urlApi}/download/user/${this.img}`;
 }

}