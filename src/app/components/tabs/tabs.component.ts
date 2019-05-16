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
  wraper:any;
  animable: boolean = true;
  indicator:any;

  constructor() { }

  ngOnInit() {

    let elements = document.getElementsByClassName('trolado-tab-label');
    for(let i = 0; i < elements.length; i++){

      this.labels.push(elements[i].innerHTML);

    }

    this.contents = document.getElementsByClassName('trolado-tab');
    for(let i = 1; i < this.contents.length; i++){
      this.contents[i].classList.add('hidden');
    }
    
    this.wraper = document.getElementsByClassName('trolado-tabs-wraper')[0];
    
    this.indicator = document.getElementsByClassName('trolado-tabs-indicator')[0];
    this.indicator.style.width = (100/this.labels.length)+'%';
  }

  exibir(item){

    if(item == this.atual || !this.animable) return;
    
    this.animable = false;    

    this.indicator.style.transform = 'translateX('+item*100+'%)';

    if(item > this.atual){

      this.wraper.classList.add('toRight');

      this.contents[item].classList.remove('hidden');
  
    } else {
      
      this.wraper.classList.add('toLeft')
      
      this.contents[item].classList.remove('hidden');

    } 

    setTimeout(()=>{//RESET
      this.contents[this.atual].classList.add('hidden');
      this.wraper.classList.remove('toLeft', 'toRight');
      this.atual = item;
      this.animable = true;
    },500);
   
  }
}
 