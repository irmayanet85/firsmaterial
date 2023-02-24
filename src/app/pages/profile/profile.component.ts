import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { MyErrorStateMatcher } from 'src/app/auth/login/login.component';
import { Usuario } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProfileService } from 'src/app/services/auth/profile.service';
import Swal from 'sweetalert2';
//import { ComponentCanDeactivate } from 'src/app/guard/pending-changes-guard.guard';

// import { Usuario } from 'src/app/models/user.models';
// import { AuthService } from 'src/app/servicios/auth/auth.service';
// import { ImgService } from 'src/app/servicios/img/img.service';
// import { ProfileService } from 'src/app/servicios/user/profile.service';
import { environment } from 'src/environments/environment';
import { ImgService } from 'src/app/services/img/img.service';

//import { Item } from '../../servicios/tools/sidebar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent 

{
  
  public user! : Usuario;
  // public img! : File;
  // public imgTemp! : any;
  // private formSubmited = false;
  // private showfieldPassword = false;
  
  email = new FormControl('', [Validators.required, Validators.pattern(environment.emailPattern)]);
  name = new FormControl('', [Validators.required, Validators.minLength(6)]);

  fGroupEditDataUser = new FormGroup([this.name, this.email] );
   matcher = new MyErrorStateMatcher();
  error : string = '';
  disabledbtn : boolean = false;
  
  constructor(private servAuth: AuthService, private servprof : ProfileService, private imgserv: ImgService){
    this.user = this.servAuth.user;
    this.email.setValue(this.user.email);
    this.name.setValue(this.user.name);

  }
  
  

  
  // onFileChange(event:any)
  // {
  //   if (event.target.files.length > 0) {
  //   const file:File = event.target.files[0];
  //   this.img = file;

  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.img);
  //   reader.onloadend = () => {
  //     console.log(reader.result);
  //     this.imgTemp = reader.result
  //   }
  //   }
    
  // }

  // enableButtonUpload(){
  //   if (this.img) {
  //     return 'enabled';
  //   } else return 'disabled';
    
  // }

  updateNameEmail(){
    console.log('actualizando')
    if (this.fGroupEditDataUser.valid == true){
      this.disabledbtn = true;
      const email:any = this.email!.value;
      this.servprof.UpdateUser(this.name.value!, email)
      .subscribe(resul => {
        Swal.fire( 'Exito!','El usuario fue actualizado correctamente','success' )
       console.log('actualizado');
       this.disabledbtn = false;
      },
      (error)=> {
        this.disabledbtn = false;

        if (error.error.msg){
         console.log('error');
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
  

  // updateImg(){
  //   if (this.img){
  //     // console.log('img valido');
  //     // console.log(this.img);
  //     this.imgserv.uploadImg(
  //       'user',
  //       this.user.id! ,
  //       this.img)
  //     .subscribe(() => {
  //       Swal.fire({
  //         title: 'Exito!',
  //         text: 'La imagen fue actualizado correctamente',
  //         icon: 'success',
  //         confirmButtonText: 'continuar'
  //       })
  //     },
  //     (error)=> {
  //       if (error.error.msg){
  
  //         Swal.fire({
  //           title: 'Atencion!',
  //           text: error.error.msg,
  //           icon: 'warning',
  //           confirmButtonText: 'ok'
  //         })
  //       }
  //       else {
  //         console.log(error);
  //         Swal.fire({
  //           title: 'Error!',
  //           text: 'Upss ocurrio un error inesperado',
  //           icon: 'error',
  //           confirmButtonText: 'ok'
  //         })
  //       }
  //     })
  //   }
    
  // } 
  

  


};
