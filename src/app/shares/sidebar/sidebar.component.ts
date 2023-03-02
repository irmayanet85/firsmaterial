
import {NestedTreeControl} from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { Usuario } from 'src/app/models/user.models';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth/auth.service';



interface MenuNode {
  name: string;
  icono? : string,
  link?: string,
  children?: MenuNode[];
}

const notLogin = {
  name : "Home",
  icono : "home",
  children : [
    {
      name: "Medical consultations ", 
      link: "/dashboard/consultation" 
    },
    {
      name: "About Hospital", 
      link: "hospital" 
    },
   

  ]
 }


const UserRol = {
  name : "My information",
  icono : "home",
  children : [
    {
      name: "My appointment", 
      link: "appointment" 
    },
    {
      name: "Analysis results", 
      link: "result" 
    },
   

  ]
 }

const AdminRol =   {
  name : "Gestion",
  icono : "warning",
  children : [
    {
      name: "Hospitals", 
      link: "/admin/hospitals" 
    },
    {
      name: "Doctors", 
      link: "/admin//doctors" 
    },
     {
       name: "Patients", 
       link: "/admin/users" 
     }
  ]
 };


 let TREE_DATA: MenuNode[] = [ ];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit{
  public user! : Usuario;
  public login : boolean = false;

  treeControl = new NestedTreeControl<MenuNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<MenuNode>();

  constructor(private authServ : AuthService) {
    //console.log('sidebar constructor');

    authServ.session.subscribe(session => {
      this.login = session.status; 
      this.user = session.dataUser;
      //console.log('subscribesession-sidebar', this.user, this.login);
      this.updateMenuAccordingUserRol();
      this.dataSource.data = TREE_DATA;
    })
      

    

    
    //console.log(TREE_DATA);
  }
  ngOnInit(): void {
    //console.log('sidebar');
  }

  hasChild = (_: number, node: MenuNode) => !!node.children && node.children.length > 0;


   updateMenuAccordingUserRol(){
    console.log('acive',this.login);
     if(this.login == true) {
           if (this.user.rol == environment.role.user){
            TREE_DATA = [notLogin, UserRol];
           }
           else if(this.user.rol == environment.role.admin){
            TREE_DATA = [notLogin, AdminRol];
           }
           
     }
     else {
      TREE_DATA = [notLogin];
     }

   }  
  
}
