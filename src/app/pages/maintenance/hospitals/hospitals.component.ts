
import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { startWith, switchMap, of, catchError, of as observableOf, map } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.models';
import { GestionHospitalService } from 'src/app/services';
import Swal from 'sweetalert2';


export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */


@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements AfterViewInit{
 
  displayedColumns: string[] = [ 'img','name', 'usuario', 'id'];
  resultsLength: number = 0;
  isloading:boolean = true;
  data = new MatTableDataSource <Hospital>();
  @ViewChild('paginator') paginator!: MatPaginator;
  //@ViewChild(MatSort) sort!: MatSort;
  pageSizes = [5];
  servhosp!:GestionHospitalService | null;
  constructor(private _httpClient: HttpClient ) {

    
  }

  ngAfterViewInit() {


   this.loadhospital();

    
  }
  loadhospital(){
    this.servhosp = new GestionHospitalService(this._httpClient);
    this.data.paginator = this.paginator;
     this.paginator.page
     .pipe(
       startWith({}),
       switchMap(() => {
         this.isloading = true;
         return this.servhosp!.listHospital(
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  deletehospital(id:string){

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
        
        this.servhosp!.deleteHospital(id).subscribe (
          ()=> {
            Swal.fire(
              'Deleted!',
              'The hospital has been deleted.',
              'success'
            )
            this.loadhospital();
    
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


