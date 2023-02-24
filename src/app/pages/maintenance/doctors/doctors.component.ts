import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, merge, startWith, switchMap, of as observableOf, map } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.models';
import { GestionDoctorService } from 'src/app/services/doctor/gestion-doctor.service';


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

  constructor( private _httpClient: HttpClient) {
  }

  ngAfterViewInit() {
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

   
  }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
  
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }

// }


