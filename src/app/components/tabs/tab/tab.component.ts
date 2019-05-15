import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'trolado-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {

  @Input() label:String = 'Label';
  @Input() key:number;


  constructor() { }

  ngOnInit() {
  }

}
