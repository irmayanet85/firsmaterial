import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { AdminGuard } from '../guard/admin.guard';
//import { AuthGuard } from '../guard/auth.guard';
//import { PendingChangesGuardGuard } from '../guard/pending-changes-guard.guard';
//import { AccountSettingComponent } from './account-setting/account-setting.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
//import { Grafica1Component } from './grafica1/grafica1.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { UsersComponent } from './maintenance/users/users.component';
import { PagesComponent } from './pages.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { AuthGuard } from '../guard/auth.guard';
import { AddEditDoctorsComponent } from './maintenance/edit/add-edit-doctors/add-edit-doctors.component';
import { AddEditHospitalComponent } from './maintenance/edit/add-edit-hospital/add-edit-hospital.component';
import { AddEditUserComponent } from './maintenance/edit/add-edit-user/add-edit-user.component';

const childRoutes : Routes = [
  { path: '', component: DashboardComponent , data: {title: 'Dashboard'}},
  { path: 'account', component: AccountSettingComponent , data: {title: 'Account setting'}},
  { path: 'profile', component: ProfileComponent, canActivate : [AuthGuard], data: {title: 'Perfil'}},
  { path: 'users', component: UsersComponent , data: {title: 'Gestion Usuarios'}},
  { path: 'hospitals', component: HospitalsComponent ,  data: {title: 'Gestion de Hospitales'}},
  { path: 'doctors', component: DoctorsComponent ,  data: {title: 'Gestion de doctores'}},
  { path: 'edit-user', component:  AddEditUserComponent, data: {title: 'Edit Usuarios'}},
  { path: 'edit-hospital', component: AddEditHospitalComponent ,  data: {title: 'Edit Hospitales'}},
  { path: 'edit-doctor/:id', component: AddEditDoctorsComponent ,  data: {title: 'Edit Doctores'}},
]


@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
