import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showimg',
  templateUrl: './showimg.component.html',
  styleUrls: ['./showimg.component.css']
})
export class ShowimgComponent {
  @Input()  public refobj! : any;

  constructor( ){
   
  

  }
}
