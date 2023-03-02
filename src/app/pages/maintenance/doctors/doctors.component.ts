import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, merge, startWith, switchMap, of as observableOf, map } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.models';
import { GestionDoctorService } from 'src/app/services/doctor/gestion-doctor.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements AfterViewInit {

  displayedColumns: string[] = [ 'img','name',  'usuario', 'hospitales', 'id'];
  resultsLength: number = 0;
  isloading = true;
  data = new MatTableDataSource <Doctor>();
  @ViewChild('paginator') paginator!: MatPaginator;
  //@ViewChild(MatSort) sort!: MatSort;
  pageSizes = [5];
  

  servdoct!: GestionDoctorService | null;

  constructor( private _httpClient: HttpClient, private _location:Location) {

  }

  ngAfterViewInit() {
    this.loadDoctors();
   
  }

  loadDoctors(){
    this.servdoct = new GestionDoctorService(this._httpClient);
    this.data.paginator = this.paginator;
     this.paginator.page
     .pipe(
       startWith({}),
       switchMap(() => {
         this.isloading = true;
         return this.servdoct!.listDoctors(
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
         return data.list;
       }),
     )
     .subscribe(data => (this.data = new MatTableDataSource(data)));
  }
  backClick(){
    this._location.back();
  }

  deleteDoctor(id:string){

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
        
        this.servdoct!.deleteDoctor(id).subscribe (
          ()=> {
            Swal.fire(
              'Deleted!',
              'The doctor has been deleted.',
              'success'
            )
            this.loadDoctors();
    
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

   
  }




