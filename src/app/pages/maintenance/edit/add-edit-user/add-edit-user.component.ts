import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models';
import { GestionDoctorService, GestionUsuariosService } from 'src/app/services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent {

  role = environment.role;

  disabledbtn: boolean = false;
  public user!:Usuario;
  rol = new FormControl('');
  fGroupEditDataUser = new FormGroup([this.rol] );

  constructor(private gestuser: GestionUsuariosService, private activeroute: ActivatedRoute, private route: Router){
    //load id of hospital

    let id:string = '';
    this.activeroute.params.subscribe(
      param=>{
        id = param['id'];
        if(id){
          //load hospital
          gestuser.getUser(id)?.subscribe (
            result=> {
              this.user = result;
              this.rol.setValue(this.user.rol!);
            }, 
            error => {
              route.navigateByUrl("/**");
            }
           )
          
        
        }
      }
    );

  }






  updateUser(){
    if(this.fGroupEditDataUser.valid){
      this.disabledbtn = true;
      this.user.rol = this.rol.value!;
      this.gestuser.editRole(this.user).subscribe(
        result=> {
          Swal.fire( 'Exito!','El rol fue actualizado correctamente','success' )
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

}
