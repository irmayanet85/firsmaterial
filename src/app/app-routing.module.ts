import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthRoutingModule } from './auth/auth-routing.module';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { NopagefoundComponent } from './common-pages/nopagefound/nopagefound.component';
import { UnauthorizedComponent } from './common-pages/unauthorized/unauthorized.component';



const routes: Routes = [
  
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'forbidden', component: UnauthorizedComponent},
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
