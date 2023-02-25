import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Usuario } from 'src/app/models/user.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  datauser = new EventEmitter<Usuario>();
  activeuser = new EventEmitter<boolean>(false); 
  private usuario!: Usuario;
  private url:string = environment.urlApi;

  constructor(private httpclient: HttpClient) { }
  
  get user ()
  {
    return this.usuario;
  }
  emitChange(user:Usuario) {
    
  }

  UpdateUser(name : string, email: string){
    console.log ('data', name, email);
    const urlconexion = `${this.url}/usuarios/${this.user.id}`;
    const token = localStorage.getItem('token');
    let header= new HttpHeaders();
    header = header.set('x-token', token!);
  
    return this.httpclient.put(
      urlconexion,
      {"name" : name,
        "email" : email },
      {headers: header})
      .pipe (
        tap( result => {
          this.usuario.name = name;
          this.usuario.email = email;
          this.datauser.emit(this.usuario);
          
        })
      );
    
  }

  registerUser(newUser: Usuario){

    const urlconexion = `${this.url}/usuarios`;
    return this.httpclient.post<any>(urlconexion,newUser);
    
  }

  ValidateAuthAndrenewToken(): Observable<boolean >{
    const urlconexion = `${this.url}/login/renew`;
    const token = localStorage.getItem('token');
    if (token){
      let header= new HttpHeaders();
      header = header.set('x-token', token!);
  
      return this.httpclient.get<any>(urlconexion,{'headers' : header}).pipe (
        tap((result) => {
          const { name,email, img, rol, google, id } = result.user;
          this.usuario = new Usuario (name, email, '', img, rol, google, id);
          localStorage.setItem('token', result.token);
          this.activeuser.emit(true);
        }),
        map(result => true),
        catchError(error => {
          this.datauser.emit(this.usuario);
          this.activeuser.emit(false);
          return of(false)
        })
      );

    }
    else return of(false);
  }

  login(email: string, password: string ){
    const urlconexion = `${this.url}/login`;
    const login = {email,password}
    
    return this.httpclient.post<any>(urlconexion,login).pipe (
      tap((result:any) => {
        const { name,email, img, rol, id } = result;
        this.usuario = new Usuario (name, email, '', img,  rol, '',id);
        localStorage.setItem('token', result.token);
        this.activeuser.emit(true);
        this.datauser.emit(this.usuario);
      }
      )
    );
  }

  logout(){
    localStorage.removeItem('token');
    this.activeuser.emit(false);
    
  
  }
}
