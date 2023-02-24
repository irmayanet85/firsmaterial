import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CargarImgComponent } from './cargar-img/cargar-img.component';
import { AngularmaterialModule } from '../angularmaterial/angularmaterial.module';
import { MatIconModule } from '@angular/material/icon';
import { ModalImgComponent } from './cargar-img/modal-img/modal-img.component';
import { CardEditImgComponent } from './card-edit-img/card-edit-img.component';





@NgModule({
  declarations: [
    CargarImgComponent,
    ModalImgComponent,
    CardEditImgComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularmaterialModule
  ],
  exports: [
    CargarImgComponent,
    CardEditImgComponent
  ]
})
export class ComponentesModule { }
