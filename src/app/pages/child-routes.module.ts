import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { AuthGuard } from '../guard/auth.guard';
import { AddEditUserComponent,AddEditHospitalComponent, AddEditDoctorsComponent, DoctorsComponent, HospitalsComponent, UsersComponent} from './maintenance';
import { ConsultationsComponent } from './consultations/consultations.component';


const childRoutes : Routes = [
  { path: '', component: DashboardComponent , data: {title: 'Dashboard'}},
  { path: 'consultation', component: ConsultationsComponent , data: {title: 'Consultation'}},
   { path: 'account', component: AccountSettingComponent , data: {title: 'Account setting'}},
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGuard], data: {title: 'Perfil'}},

]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
