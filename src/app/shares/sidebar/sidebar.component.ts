
import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { Usuario } from 'src/app/models/user.models';
import { AuthService } from '../../services/auth/auth.service';



interface MenuNode {
  name: string;
  icono? : string,
  link?: string,
  children?: MenuNode[];
}

 

const TREE_DATA: MenuNode[] = [
 
  {
        name : "Principal",
        icono : "home",
        children : [
          {
            name: "Grafica", 
            link: "grafica1" 
          },
          {
            name: "Progress", 
            link: "progress" 
          },
          {
            name: "Dashboard", 
            link: "/" 
          },
          {
            name: "Promesas", 
            link: "promesas" 
          },
          {
            name: "RXJS", 
            link: "rxjs-page" 
          }
  
        ]
       },
       {
        name : "Gestion",
        icono : "warning",
        children : [
          {
            name: "Hospitales", 
            link: "/admin/hospitals" 
          },
          {
            name: "Medicos", 
            link: "/admin//doctors" 
          },
           {
             name: "Usuarios", 
             link: "/admin/users" 
           }
        ]
       },
      
];



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent {
  public user! : Usuario;
  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();

  constructor(private serv : AuthService) {
    this.user = this.serv.user;
    this.dataSource.data = TREE_DATA;
    //console.log(TREE_DATA);
  }

  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;


  
  
}
