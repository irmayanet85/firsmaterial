import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyErrorStateMatcher } from 'src/app/auth/login/login.component';
import { IHospital } from 'src/app/interfaces';
import { Hospital } from 'src/app/models';
import Swal from 'sweetalert2';
import { GestionHospitalService } from '../../../../services/hospital/gestion-hospital.service';

@Component({
  selector: 'app-add-edit-hospital',
  templateUrl: './add-edit-hospital.component.html',
  styleUrls: ['./add-edit-hospital.component.css']
})
export class AddEditHospitalComponent {
  public hospital!:Hospital;
  name = new FormControl('', [Validators.required, Validators.minLength(6)]);
  description = new FormControl('esta es una descripcion....', [Validators.required, Validators.minLength(6)]);
  update: boolean = true; 

  id:string = '';
  fGroupEditDataHospital = new FormGroup([this.name] );
  matcher = new MyErrorStateMatcher();
  error : string = '';
  disabledbtn : boolean = false;

  constructor(private gesthosp : GestionHospitalService, private activeroute: ActivatedRoute, private route: Router){
     //load id of hospital
     this.loadhospital();

   
    }
    loadhospital(){
      this.error = '';
      
      this.activeroute.params.subscribe(
        param=>{
          this.id = param['id'];
          if(this.id == 'new'){
            this.update = false;
          }
          else if(this.id){
            //load hospital
             this.gesthosp.getHospital(this.id)?.subscribe (
              result=> {
                this.hospital = result;
                this.name.setValue(this.hospital.name);
              }, 
              error => {
                console.log('mierror',error.error.msg);
                if (error.error.msg) {
                  console.log(error.error.msg);
                       this.error = error.error.msg;
                }
                
              }
             )
            
          
          }
         
    
        }
      );
    }
  refresh(): void {
    window.location.reload();
}


  updateHospital(){
    if(this.fGroupEditDataHospital.valid){
      this.disabledbtn = true;
      this.gesthosp.editHospital(this.hospital.id!, this.name.value!).subscribe(
        ()=> {
          Swal.fire( 'Exito!','El hospital fue actualizado correctamente','success' )
          this.disabledbtn = false;

        }, 
        error => {
          this.disabledbtn = false;
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

        }
      )
    }
  }

  addHospital(){
    if(this.fGroupEditDataHospital.valid){
      this.disabledbtn = true;
      this.gesthosp.AddHospital(this.name.value!).subscribe(
        result=> {
          this.hospital = result;
          Swal.fire( 'Exito!','El hospital fue creado correctamente','success' )
          this.disabledbtn = false;
          this.update = true;

        }, 
        error => {
          this.disabledbtn = false;
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

        }
      )
    }
  }


}
