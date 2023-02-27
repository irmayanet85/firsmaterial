import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { SharesModule } from '../shares/shares.module';
import { AngularmaterialModule } from '../angularmaterial/angularmaterial.module';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../component/componentes.module';
import { AddEditUserComponent,AddEditHospitalComponent, AddEditDoctorsComponent, DoctorsComponent, HospitalsComponent, UsersComponent} from './maintenance';
import { ConsultationsComponent } from './consultations/consultations.component';




@NgModule({
  declarations: [
    PagesComponent,
    UsersComponent,
    DoctorsComponent,
    HospitalsComponent,
    AccountSettingComponent,
    ProfileComponent,
    DashboardComponent,
    AddEditHospitalComponent,
    AddEditUserComponent,
    AddEditDoctorsComponent,
    ConsultationsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    SharesModule,
    AngularmaterialModule,
    RouterModule,
    FormsModule,
    ComponentesModule
  ]
})
export class PagesModule { }
