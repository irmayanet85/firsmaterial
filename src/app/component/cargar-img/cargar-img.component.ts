import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon, MatIconRegistry } from '@angular/material/icon';
import { ModalImgComponent } from './modal-img/modal-img.component';




@Component({
  selector: 'app-cargar-img',
  templateUrl: './cargar-img.component.html',
  styleUrls: ['./cargar-img.component.css']
})


export class CargarImgComponent  {

  @Input() url!: string;
  
  
  constructor(public dialog: MatDialog) { }
  
  

  
  cancel(){
    // this.imgTemp = '';
    // //this.img = null;

    // this.acction = this.objAction.hide
  }
  openModal(){
    this.dialog.open(ModalImgComponent, {data : {url:this.url} });
    
  }

}

