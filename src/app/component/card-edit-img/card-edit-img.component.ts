import { Component, Input, Type } from '@angular/core';
import { Doctor, Hospital } from 'src/app/models';
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

  constructor(private servAuth: AuthService, private imgserv: ImgService){
   
  

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

  typeObject(obj:any):string | null{
    
    if (this.refobj instanceof Hospital) return 'hospital';
     
      else if (this.refobj instanceof Doctor) return  'medico';
    
        else if (this.refobj instanceof Usuario) return 'user';

           else return null

  }

  updateImg(){
   const typeobject = this.typeObject(this.refobj);

    if (this.img && typeobject!= ''){
      
     this.imgserv.uploadImg(  typeobject!, this.refobj.id! , this.img)
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
    else {
      Swal.fire({
        title: 'Atention!',
        text: 'Debe seleccionar una imagen',
        icon: 'warning',
        confirmButtonText: 'continuar'
      })
    }
    
  } 
  

}
