import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth-routing.module';

import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { LoginComponent } from './auth/login/login.component';


import { PagesRoutingModule } from './pages/pages-routing.module';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';



const routes: Routes = [
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagefoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
             PagesRoutingModule,
             AuthRoutingModule
          ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
