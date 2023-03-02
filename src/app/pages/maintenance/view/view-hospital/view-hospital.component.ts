import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionHospitalService } from 'src/app/services';
import { Hospital } from '../../../../models/hospital.models';

@Component({
  selector: 'app-view-hospital',
  templateUrl: './view-hospital.component.html',
  styleUrls: ['./view-hospital.component.css']
})
export class ViewHospitalComponent {
  error: string = '';
  hospital!: Hospital ;
  id: string = '';
  constructor(private gesthosp : GestionHospitalService, private activeroute: ActivatedRoute, private route: Router){
    //load id of hospital
    this.loadhospital();

  
   }
   loadhospital(){
     this.error = '';
     
     this.activeroute.params.subscribe(
       param=>{
         this.id = param['id'];
        
         if(this.id){
           //load hospital
            this.gesthosp.getHospital(this.id)?.subscribe (
             result=> {
               this.hospital = result;
              
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

}
