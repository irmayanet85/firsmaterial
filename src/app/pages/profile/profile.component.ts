import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MyErrorStateMatcher } from 'src/app/auth/login/login.component';
import { Usuario } from 'src/app/models/user.models';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthService, ProfileService, ImgService } from 'src/app/services';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent 

{
  
  public user! : Usuario;  
  email = new FormControl('', [Validators.required, Validators.pattern(environment.emailPattern)]);
  name = new FormControl('', [Validators.required, Validators.minLength(6)]);

  fGroupEditDataUser = new FormGroup([this.name, this.email] );
   matcher = new MyErrorStateMatcher();
  error : string = '';
  disabledbtn : boolean = false;
  
  constructor(private servAuth: AuthService,  private imgserv: ImgService){
    this.user = this.servAuth.user;
    this.email.setValue(this.user.email);
    this.name.setValue(this.user.name);

  }
  

  updateNameEmail(){
    console.log('actualizando')
    if (this.fGroupEditDataUser.valid == true){
      this.disabledbtn = true;
      const email:any = this.email!.value;
      this.servAuth.UpdateUser(this.name.value!, email)
      .subscribe(resul => {
        Swal.fire( 'Exito!','El usuario fue actualizado correctamente','success' )
       console.log('actualizado');
       this.disabledbtn = false;
      }
      // ,
      // error=> {
      //   this.disabledbtn = false;

      //   if (error.error.msg){
      //    console.log('error');
      //    Swal.fire({
      //     title: 'Atencion!',
      //     text: error.error.msg,
      //     icon: 'warning',
      //     confirmButtonText: 'ok'
      //   })
      //   }
      //   else {
      //     console.log(error);
      //     Swal.fire({title: 'Error!',text: 'Upss ocurrio un error inesperado',icon: 'error', confirmButtonText: 'ok'
      //     })
          
      //   }
      // }
      )
    }
    
  } 
  

  


};
