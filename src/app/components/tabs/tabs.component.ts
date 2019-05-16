import { Component, OnInit } from '@angular/core';
import { element } from '@angular/core/src/render3';

@Component({
  selector: 'trolado-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  labels:any = [];
  contents:any;
  tabs:any = [];
  atual:number = null;
  wraper:any;


  constructor() { }

  ngOnInit() {

    let elements = document.getElementsByClassName('trolado-tab-label');
    for(let i = 0; i < elements.length; i++){

      this.labels.push(elements[i].innerHTML);

    }

    this.contents = document.getElementsByClassName('trolado-tab-content');
    
    this.wraper = document.getElementsByClassName('trolado-tabs-wraper')[0];
    this.wraper.style.width =  this.labels.length+'00%';
    
  }

  exibir(item){
    
    let percent = (item/this.labels.length)*100
    this.wraper.style.transform = 'translateX(-'+percent+'%)';
  }
}
 