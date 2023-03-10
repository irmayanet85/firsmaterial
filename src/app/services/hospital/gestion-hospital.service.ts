import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/user.models';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { ListHospital, SearchHospital, IHospital } from '../../interfaces/searchGlobal';
import { map, Observable } from 'rxjs';
import { Hospital } from '../../models/hospital.models';
import { IHopitalReduce, IUsuario } from 'src/app/interfaces/doctorlist.interface';

@Injectable({
  providedIn: 'root'
})
export class GestionHospitalService {

  private url:string = environment.urlApi;
  //private user! : Usuario;
  
  constructor(private httpclient: HttpClient ) {
    //this.user = servauth.user;
   }

   get header(){
      const token = localStorage.getItem('token');
      let header= new HttpHeaders();
      header = header.set('x-token', token!);
      return {headers:header}
   }
   page(from:number){


    if(from==0)
    {
       return 0;
    }
    else {
     return from * 5 ;
    }
  }

   listHospital(page: number=0): Observable<ListHospital>{
    page = this.page(page);
      const urlconexion = `${this.url}/hospitales?from=${page}`;
      
    
      return this.httpclient.get<ListHospital>(urlconexion, this.header)
        .pipe(
          map( result => {
                const listhospital = result.list.map(
                hospital => new Hospital(hospital.name, hospital.img, hospital.usuario, hospital.id)
                )   
                return {list:listhospital, total:result.total};
               
               }
            )
        );
      
    }

    search(termino: string): any{
      
      // const urlconexion = `${this.url}/search/${termino}`;
      // return this.httpclient.get<any>(urlconexion, this.header)
      // .pipe(
      //   map( result => {
      //         let listhospital: Hospital[] = [];
              
      //         for (let index = 0; index < result.hospitales.length; index++) {
      //           const element = result.hospitales[index];
      //           let usuario = null ;
      //           if (element.usuario){
      //             usuario = new  Usuario(element.usuario!.name, element.usuario!.email,"", element.usuario?.img, element.usuario?.rol, element.usuario?.google, element.usuario?._id )  

      //           }
      //           const hospital =  new Hospital(element.name, element.img, usuario!, element.id)
      //           //console.log(hospital);
      //           listhospital.push(hospital);
      //         }
              
      //         //console.log('desde serv', listhospital); 
            
      //       return {list:listhospital, total:listhospital.length};
             
      //     })
      // );
      
    }

    deleteHospital(id:string){
      const urlconexion = `${this.url}/hospitales/${id}`;
      return this.httpclient.delete(urlconexion, this.header);

    }

    editHospital(id:string, name:string){
      const urlconexion = `${this.url}/hospitales/${id}`;
      return this.httpclient.put(urlconexion, {name},this.header);

    }

    AddHospital(name:string): Observable<Hospital>{
      const urlconexion = `${this.url}/hospitales`;
      return this.httpclient.post<any>(urlconexion, {name},this.header).pipe (
        map ( result => {
          const h = result.hospital;
          const hosp = new Hospital (h.name,h.img,h.usuario, h.id);
          return hosp;
        })
      );

    }

    listArrayHospital(from: number=0): Observable<any>{
      
      const urlconexion = `${this.url}/hospitales?from=${from}`;
      

    //   export interface IHopitalReduce {
    //     _id:     string;
    //     name:    string;
    // }
    
      return this.httpclient.get<ListHospital>(urlconexion, this.header)
        .pipe(
          map( result => {

                let listhospital: IHopitalReduce[] = [];
                
                  result.list.forEach(element => {
                    let hos: IHopitalReduce = { 
                      _id: element.id!,
                      name: element.name
                    }
                    listhospital.push(hos);
                  });
                  return listhospital;
                }
                  
                )
               
                );
      
    }

    getHospital(id: string): Observable<Hospital> | null{
      
      const urlconexion = `${this.url}/hospitales/${id}`;
      
      return this.httpclient.get<any>(urlconexion, this.header)
        .pipe(   map( result => {
          const h = result.hospital;
          const hosp = new Hospital (h.name,h.img,h.usuario, h.id);
          return hosp;
        } ) );
      
    }



}
