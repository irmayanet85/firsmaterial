import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-diveresponsive',
  templateUrl: './diveresponsive.component.html',
  styleUrls: ['./diveresponsive.component.css']
})
export class DiveresponsiveComponent implements OnInit {
  @Output() smolldivice = new EventEmitter<string>();
  constructor(public breakpointObserver: BreakpointObserver){
    this.breakpointObserver
      .observe(['(min-width: 700px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          //console.log('debe estar abierto');
          
        } else {
          //console.log('debe estar cerrado');
          this.smolldivice.emit('closed');
          //const element = document.querySelector("#drawer");
          
        }
      });
  }
  ngOnInit() {

  }

}
