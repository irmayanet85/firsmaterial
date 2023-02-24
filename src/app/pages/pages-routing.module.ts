import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: PagesComponent,
    //canLoad:[AuthGuard],
    //canActivate: [AuthGuard],
    loadChildren:()=> import('./child-routes.module').then(m => m.ChildRoutesModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
