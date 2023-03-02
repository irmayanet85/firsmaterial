import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { AuthGuard } from '../guard/auth.guard';
import { AddEditUserComponent,AddEditHospitalComponent, AddEditDoctorsComponent, DoctorsComponent, HospitalsComponent, UsersComponent} from './maintenance';
import { ConsultationsComponent } from './consultations/consultations.component';
import { ViewHospitalComponent } from './maintenance/view/view-hospital/view-hospital.component';
import { ViewDoctorComponent } from './maintenance/view/view-doctor/view-doctor.component';


const childRoutesUser : Routes = [
   { path: 'account', component: AccountSettingComponent , data: {title: 'Account setting'}},
   { path: 'profile', component: ProfileComponent, data: {title: 'Perfil'}},
   { path: 'view-hospital/:id', component: ViewHospitalComponent, data: {title: 'view Hospital'}},
   { path: 'view-doctor/:id', component: ViewDoctorComponent, data: {title: 'view Doctor'}},
   
   
]


@NgModule({
  imports: [RouterModule.forChild(childRoutesUser)],
  exports: [RouterModule]
})
export class ChildRoutesUserModule { }
