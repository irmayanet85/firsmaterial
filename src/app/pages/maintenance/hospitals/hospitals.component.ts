
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Hospital } from 'src/app/models/hospital.models';
import { GestionHospitalService } from 'src/app/services';


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
  displayedColumns: string[] = [ 'name', 'img', 'usuario', 'id'];
  dataSource!: MatTableDataSource<Hospital>;
  hospitales:Hospital[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private servhospit: GestionHospitalService) {
    servhospit.listHospital().subscribe(result=> {
      this.hospitales= result.list;
      this.dataSource = new MatTableDataSource(this.hospitales);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })

    
  }

  ngAfterViewInit() {
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


