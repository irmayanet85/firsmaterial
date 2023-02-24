
import {NestedTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';



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
            link: "./hospitals" 
          },
          {
            name: "Medicos", 
            link: "./doctors" 
          },
           {
             name: "Usuarios", 
             link: "./users" 
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
  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
    //console.log(TREE_DATA);
  }

  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;


  
  
}
