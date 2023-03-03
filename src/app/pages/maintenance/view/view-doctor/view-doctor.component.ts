import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Doctor } from 'src/app/models';
import { GestionDoctorService } from '../../../../services/doctor/gestion-doctor.service';

@Component({
  selector: 'app-view-doctor',
  templateUrl: './view-doctor.component.html',
  styleUrls: ['./view-doctor.component.css']
})
export class ViewDoctorComponent {
error = '';
doctor!: Doctor;
id="";
constructor(private activeroute: ActivatedRoute, private servgestDoctor: GestionDoctorService) 
  {

    this.id = "";
    this.activeroute.params.subscribe(
      param=> {
        this.id = param['id'];
        if (this.id)
        { 
          this.loadDoctor();
        }

    }
      
    );

    

} 
loadDoctor(){
    //load doctor
    this.error = '';
    this.servgestDoctor.getDoctor(this.id).subscribe(result => {
      

        this.doctor= result;
    
    }, 
    error => {
      
      if (error.error.msg){
        this.error = error.error.msg;
      }
      else {
        this.error = "Upsss! ocurrio un error inesperado";
        console.log('ocurrio un error', error);
      }
    });
    }

}
