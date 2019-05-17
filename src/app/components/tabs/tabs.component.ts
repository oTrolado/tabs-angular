import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { query } from '@angular/core/src/render3';

@Component({
  selector: 'trolado-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit {

  labels:any = [];
  contents:any;
  tabs:any = [];
  atual:number = 0;
  wraper:any;
  animable: boolean = true;
  indicator:any;
  arrows:boolean = true;

  @ViewChild("header") header: ElementRef;
  @ViewChild("headerContainer") headerContainer: ElementRef;

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


  ngAfterViewInit(){
    
    document.getElementsByClassName('trolado-tab-label-item')[0].classList.add('active-label');


    this.header.nativeElement.style.minWidth = this.labels.length * 75 + 'px';
    
  }

  onResize(event){
    let container = this.headerContainer.nativeElement.clientWidth;
    let element = this.header.nativeElement.clientWidth;
    console.log(container+ ' ' +element);
    if(container < element){
      this.arrows = true;
      return true;
    } 
    
    this.arrows = false;
    this.header.nativeElement.style.left = '0';
    return false;

  }


  exibir(item){

    if(item == this.atual || !this.animable) return;
    
    this.animable = false;    

    this.indicator.style.transform = 'translateX('+item*100+'%)';

    document.getElementsByClassName('trolado-tab-label-item')[this.atual].classList.remove('active-label');
    document.getElementsByClassName('trolado-tab-label-item')[item].classList.add('active-label');

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




  ripple(event, element){
    let elements = document.getElementsByClassName('trolado-tab-label-item');

    let div = document.createElement('div');
    div.classList.add('ripple');

    elements[element].appendChild(div);

    div.style.top = (event.layerY)+"px";
    div.style.left = (event.layerX)+"px";

    if(event.target.clientWidth >= event.target.clientHeight){
      
      div.style.transform = 'scale('+(event.target.clientWidth*2.2)/12+')';
    
    } else {
      console.log(event);
      div.style.transform = 'scale('+(event.target.clientHeight*2.8)/12+')';

    }


    setTimeout(()=>div.style.backgroundColor = 'transparent', 400);
    setTimeout(()=>div.remove(), 800);
  }

  navigate(direction){
    let position = parseInt(this.header.nativeElement.style.left + 1);

    if(direction == 'right'){

      this.header.nativeElement.style.left = position - 60+'px';

    } else {

      this.header.nativeElement.style.left = position + 60+'px';
    }
  }
}
 