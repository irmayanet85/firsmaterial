import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './menu/menu.component';
import { AngularmaterialModule } from '../angularmaterial/angularmaterial.module';
import { DiveresponsiveComponent } from './diveresponsive/diveresponsive.component';
import { RouterModule } from '@angular/router';
import { NoticeComponent } from './notice/notice.component';
import { MenuSubmenuComponent } from './menu-submenu/menu-submenu.component';




@NgModule({
  declarations: [
    SidebarComponent,
    MenuComponent,
    DiveresponsiveComponent,
    NoticeComponent,
    MenuSubmenuComponent
  ],
  imports: [
    CommonModule,
    AngularmaterialModule,
    RouterModule,
  ], 
  exports: [
    SidebarComponent, 
    MenuComponent,
    DiveresponsiveComponent,
    NoticeComponent,
    MenuSubmenuComponent
  ]
})
export class SharesModule { }
