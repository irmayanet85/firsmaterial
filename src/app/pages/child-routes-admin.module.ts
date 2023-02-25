import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { AuthGuard } from '../guard/auth.guard';
import { AddEditUserComponent,AddEditHospitalComponent, AddEditDoctorsComponent, DoctorsComponent, HospitalsComponent, UsersComponent} from './maintenance';


const childRoutesadmin : Routes = [
  { path: 'users', component: UsersComponent , data: {title: 'Gestion Usuarios'}},
  { path: 'hospitals', component: HospitalsComponent ,  data: {title: 'Gestion de Hospitales'}},
  { path: 'doctors', component: DoctorsComponent ,  data: {title: 'Gestion de doctores'}},
  { path: 'edit-user', component:  AddEditUserComponent, data: {title: 'Edit Usuarios'}},
  { path: 'edit-hospital', component: AddEditHospitalComponent ,  data: {title: 'Edit Hospitales'}},
  { path: 'edit-doctor/:id', component: AddEditDoctorsComponent ,  data: {title: 'Edit Doctores'}},
]


@NgModule({
  imports: [RouterModule.forChild(childRoutesadmin)],
  exports: [RouterModule]
})
export class ChildRoutesAdminModule { }