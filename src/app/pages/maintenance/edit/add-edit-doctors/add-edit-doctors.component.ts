import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/auth/login/login.component';
import { Doctor } from 'src/app/models/doctor.models';
import { Hospital } from 'src/app/models/hospital.models';
import { GestionDoctorService } from 'src/app/services/doctor/gestion-doctor.service';
import Swal from 'sweetalert2';
import { map, Observable, startWith } from 'rxjs';


// 
// 
// import {FormControl} from '@angular/forms';
// 
// 
// import {Observable} from 'rxjs';
// 
import { GestionHospitalService } from '../../../../services/hospital/gestion-hospital.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { IHopitalReduce } from '../../../../interfaces/doctorlist.interface';


@Component({
  selector: 'app-add-edit-doctors',
  templateUrl: './add-edit-doctors.component.html',
  styleUrls: ['./add-edit-doctors.component.css']
})
export class AddEditDoctorsComponent implements OnInit{

  public doctor! : Doctor;
  

  separatorKeysCodes: number[] = [ENTER, COMMA];
 


//componente
   hospitalsCtrl = new FormControl('');
   filteredHospital!: Observable<IHopitalReduce[]>;
   hospitals: IHopitalReduce[] = [];
   allHospitals: IHopitalReduce[] = [];
 
   @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
 
//endcomponet

 
  name = new FormControl('', [Validators.required, Validators.minLength(6)]);


  fGroupEditDataDoctor = new FormGroup([this.name] );
  matcher = new MyErrorStateMatcher();
  error : string = '';
  disabledbtn : boolean = false;
  
 
  

  constructor(private activeroute: ActivatedRoute, 
    private servgestDoctor: GestionDoctorService, 
    private servgestHospital: GestionHospitalService,
    private route: Router
    ) {
  //load all hospitall
   servgestHospital.listArrayHospital().subscribe (result => {
    this.allHospitals = result;
    console.log('all hospitals',this.allHospitals);
   }, error => {
    console.log('can not obtain the list of all hospitals');
   });

   //load id of doctor

  let id:number = 0;
  this.activeroute.params.subscribe(
    param=>{
      id = param['id'];
      console.log('parametro',
      param['id']);
    }
  );
  //load doctor
  this.servgestDoctor.getDoctor(id).subscribe(result => {
    if (result){

      this.doctor= result;
      this.name.setValue(this.doctor.name);
      //console.log('doctor', this.doctor);
        //load hospital predefine to the doctor
      if(this.doctor.hospitales){
  
        this.hospitals = this.doctor.hospitales! ;
        this.removeOnAllHospitalbeforeAsigned();
      }
      this.filteredHospital = this.hospitalsCtrl.valueChanges.pipe(
  
        startWith(null),
        map((hospital: string | null) => (hospital ? this._filter(hospital) : this.allHospitals)),
      );
       
    //console.log('lista de hospitales asociados', this.hospitals )
    }
    else{
      this.route.navigate(['./error']);
    }
  }, 
  error => {
    console.log('ocurrio un error');
    this.route.navigate(['./error']);
  });

 

  
  
  
  } 

  removeOnAllHospitalbeforeAsigned(){
    if(this.hospitals.length > 0){
       this.hospitals.forEach(element => {
        let index = this.allHospitals.findIndex(hospital => hospital._id == element._id);
        this.allHospitals.splice(index,1);

       });
 

  }
}
  
  removeOnAllHospitall(hospital: IHopitalReduce): any {

    const index = this.allHospitals.indexOf(hospital);
    console.log('removeOnAllHospitall', hospital, index);

    if (index >= 0) {
     this.allHospitals.splice(index, 1);
     return 1;
    }
    return 0;
 }

  addOnAllHospitall(hospital: IHopitalReduce): void {

     this.allHospitals.push(hospital);
    
 }

  remove(hospital: IHopitalReduce): void {

     const index = this.hospitals.indexOf(hospital);

     if (index >= 0) {
      this.hospitals.splice(index, 1);
      this.addOnAllHospitall(hospital);
     }

  }

  selected(event: MatAutocompleteSelectedEvent): void {
   
      
         let hosp: IHopitalReduce = this.getHospitalbyId(event.option.value)!;
         this.hospitals.push(hosp);
         this.fruitInput.nativeElement.value = '';
         this.hospitalsCtrl.setValue(null);
         this.removeOnAllHospitall(hosp);
  }

  getHospitalbyId(id:string): IHopitalReduce | null{
    return this.allHospitals.find(hospital => hospital._id == id) || null;

  }

  private _filter(value: string): IHopitalReduce[] {
    const filterValue = value.toLowerCase();

    return this.allHospitals.filter(
      hospital => hospital.name.toLowerCase().includes(filterValue)
      );
  }
  
  ngOnInit(): void {
   
  }
    

  updateDoctor(){
    console.log('actualizando')
    if (this.fGroupEditDataDoctor.valid == true){
      this.disabledbtn = true;
      let arrayhospital:string[]=[];
      this.hospitals.map(
        hospital=>arrayhospital.push(hospital._id)
      )
      console.log ('arrayhosp', arrayhospital, this.name.value, this.doctor.id);

      this.servgestDoctor.editDoctor(this.name.value!, this.doctor.id!, arrayhospital)
      .subscribe(resul => {
        Swal.fire( 'Exito!','El doctor fue actualizado correctamente','success' )
       console.log('actualizado');
       this.disabledbtn = false;
      },
      (error)=> {
        this.disabledbtn = false;

        console.log(error);
        if (error.error.msg){
         Swal.fire({
          title: 'Atencion!',
          text: error.error.msg,
          icon: 'warning',
          confirmButtonText: 'ok'
        })
        }
        else {
          console.log(error);
          Swal.fire({title: 'Error!',text: 'Upss ocurrio un error inesperado',icon: 'error', confirmButtonText: 'ok'
          })
          
        }
      })
    }
    
  } 
  
  

}
