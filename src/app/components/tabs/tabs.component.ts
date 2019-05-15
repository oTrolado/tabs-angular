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
  atual:number = 1;

  constructor() { }

  ngOnInit() {
    let elements = document.getElementsByClassName('trolado-tab-label');
    for(let i = 0; i < elements.length; i++){

      this.labels.push(elements[i].innerHTML);

    }

    this.contents = document.getElementsByClassName('trolado-tab-content');
    
    for(let i = 0; i < this.contents.length; i++){

      this.contents[i].classList.add('hidden');

    }

    this.exibir(0);
  }

  exibir(item){
    
    let wraper = document.getElementsByClassName('trolado-tabs-wraper')[0]
    if(item >= this.atual){
      //rodar para esquerda
      this.contents[item].classList.remove('hidden');
      wraper.classList.add('rotate-right');
      setTimeout(() => {
        wraper.classList.remove('rotate-right');
        this.contents[this.atual].classList.add('hidden');
      }, 1000);
    } else {
      //rodar para a direita
    }
    
    
    this.atual = item;
  }
}
 