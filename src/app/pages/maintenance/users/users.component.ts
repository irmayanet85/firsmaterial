import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, startWith, switchMap, of as observableOf, map } from 'rxjs';
import { ISession } from 'src/app/interfaces';
import { Usuario } from 'src/app/models/user.models';
import { AuthService, GestionUsuariosService } from 'src/app/services';
import Swal from 'sweetalert2';
import { SearchUser } from '../../../interfaces/searchGlobal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit  {
  displayedColumns: string[] = [ 'img','name', 'email', 'rol', 'id'];
  resultsLength: number = 0;
  isloading = true;
  private user!: Usuario;
  data = new MatTableDataSource <Usuario>();
  @ViewChild('paginator') paginator!: MatPaginator;
  //@ViewChild(MatSort) sort!: MatSort;
  pageSizes = [5];
  

  servuser!: GestionUsuariosService | null;

  constructor( private _httpClient: HttpClient, private servauth: AuthService) {
    this.user =  servauth.user;
  }

  ngAfterViewInit() {
    this.loadUser();
   
  }

  loadUser(){
    this.servuser = new GestionUsuariosService(this._httpClient);
    this.data.paginator = this.paginator;
     this.paginator.page
     .pipe(
       startWith({}),
       switchMap(() => {
         this.isloading = true;
         return this.servuser!.listUsers(
           this.paginator.pageIndex,
         ).pipe(catchError(() => observableOf(null)));
       }),
       map(data => {
         // Flip flag to show that loading has finished.
         this.isloading = false;
   

         if (data === null) {
           return [];
         }
         this.resultsLength = data.total;
         //console.log(data.total, data.list);
         return data.list;
       }),
     )
     .subscribe(data => (this.data = new MatTableDataSource(data)));
  }


deleteUser(id:string){

  if (this.user.id != id){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
  
       
        
        this.servuser!.deleteUser(id).subscribe (
          ()=> {
            Swal.fire(
              'Deleted!',
              'The doctor has been deleted.',
              'success'
            )
            this.loadUser();
    
          },
          error => {
            if (error.error.msg){
              Swal.fire({
               title: 'Atencion!',
               text: error.error.msg,
               icon: 'warning',
               confirmButtonText: 'ok'
             })
             }
  
          }
        )
       
      }
    })
  }
  else {
    Swal.fire({
      title: 'Atention!',
      text: 'No puede borrarse a si mismo',
      icon: 'warning',
      confirmButtonText: 'continuar'
    })
  }


  
}

}