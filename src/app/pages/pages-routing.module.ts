import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { AuthGuard } from '../guard/auth.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    loadChildren:()=> import('./child-routes.module').then(m => m.ChildRoutesModule)
  }, 
  { 
    path: 'admin', 
    component: PagesComponent,
    canActivate:[AuthGuard, AdminGuard],
    loadChildren:()=> import('./child-routes-admin.module').then(m => m.ChildRoutesAdminModule)
  }, 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
