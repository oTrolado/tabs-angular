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
  atual:number = 0;

  constructor() { }

  ngOnInit() {
    let elements = document.getElementsByClassName('trolado-tab-label');
    for(let i = 0; i < elements.length; i++){
      this.labels.push(elements[i].innerHTML);
    }

    this.contents = document.getElementsByClassName('trolado-tab-content');
    
    for(let i = 0; i < this.contents.length; i++){
      this.tabs.push(this.contents[i].outerHTML);
      this.contents[i].parentNode.removeChild(this.contents[i]);
      i--;
    }

    this.exibir(0);
  }

  exibir(item){
    
    for(let i = 0; i < this.contents.length; i++){
      this.contents[i].parentNode.removeChild(this.contents[i]);
    }
    let element = document.createElement('div');
    element.innerHTML = this.tabs[item];
    document.getElementsByClassName('trolado-tabs-content')[0].appendChild(element);
    this.atual = item;
  }
}
 