import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharesModule } from '../shares/shares.module';
import { AngularmaterialModule } from '../angularmaterial/angularmaterial.module';
import { PagesComponent } from './pages.component';
import { UsersComponent } from './maintenance/users/users.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from '../component/componentes.module';
import { AddEditHospitalComponent } from './maintenance/edit/add-edit-hospital/add-edit-hospital.component';
import { AddEditUserComponent } from './maintenance/edit/add-edit-user/add-edit-user.component';
import { AddEditDoctorsComponent } from './maintenance/edit/add-edit-doctors/add-edit-doctors.component';



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
    AddEditDoctorsComponent
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
