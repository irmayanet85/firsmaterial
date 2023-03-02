import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularmaterialModule } from './angularmaterial/angularmaterial.module';
import { SharesModule } from './shares/shares.module';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { NopagefoundComponent } from './common-pages/nopagefound/nopagefound.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { UnauthorizedComponent } from './common-pages/unauthorized/unauthorized.component';
import { ReducenamePipe } from './pipe/reducename.pipe';


@NgModule({
  declarations: [
    AppComponent,
    NopagefoundComponent,
    UnauthorizedComponent,
    ReducenamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularmaterialModule,
    PagesModule,
    RouterModule,
    AuthModule,
    LayoutModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
