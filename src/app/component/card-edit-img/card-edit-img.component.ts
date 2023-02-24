import { Component, Input } from '@angular/core';
import { Usuario } from 'src/app/models/user.models';
import { AuthService, ImgService, ProfileService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-card-edit-img',
  templateUrl: './card-edit-img.component.html',
  styleUrls: ['./card-edit-img.component.css']
})
export class CardEditImgComponent {

  
  @Input()  public refobj! : any;

  public img! : File;
  public imgTemp! : any;

  constructor(private servAuth: AuthService, private servprof : ProfileService, private imgserv: ImgService){
   
  

  }

  onFileChange(event:any)
  {
    if (event.target.files.length > 0) {
    const file:File = event.target.files[0];
    this.img = file;

    const reader = new FileReader();
    reader.readAsDataURL(this.img);
    reader.onloadend = () => {
      //console.log(reader.result);
      this.imgTemp = reader.result
    }
    }
    
  }

  enableButtonUpload(){
    if (this.img) {
      return 'enabled';
    } else return 'disabled';
    
  }

  updateImg(){
    if (this.img){
      // console.log('img valido');
      // console.log(this.img);
      this.imgserv.uploadImg(
        'user',
        this.refobj.id! ,
        this.img)
      .subscribe(() => {
        Swal.fire({
          title: 'Exito!',
          text: 'La imagen fue actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'continuar'
        })
      },
      (error)=> {
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
          Swal.fire({
            title: 'Error!',
            text: 'Upss ocurrio un error inesperado',
            icon: 'error',
            confirmButtonText: 'ok'
          })
        }
      })
    }
    
  } 
  

}
