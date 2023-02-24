import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { catchError, merge, startWith, switchMap, of as observableOf, map } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.models';
import { Usuario } from 'src/app/models/user.models';
import { GestionDoctorService } from 'src/app/services/doctor/gestion-doctor.service';
import { GestionUsuariosService } from 'src/app/services/user/gestion-usuarios.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit  {
  displayedColumns: string[] = [ 'img','name', 'email', 'rol', 'id'];
  resultsLength: number = 0;
  isloading = true;
  data = new MatTableDataSource <Usuario>();
  @ViewChild('paginator') paginator!: MatPaginator;
  //@ViewChild(MatSort) sort!: MatSort;
  pageSizes = [5];
  

  servuser!: GestionUsuariosService | null;

  constructor( private _httpClient: HttpClient) {
  }

  ngAfterViewInit() {
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
}
