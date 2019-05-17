import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'trolado-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit {
  //CONTROLES DE ESTADO
  atual:number = 0;
  arrows:boolean = false;
  animable: boolean = true;

  //HEADER
  labels:any = [];
  labelItem:any;
  indicator:any;

  //CONTEUDO
  contents:any;
  tabs:any = [];
  wraper:any;
  
  
  

  @ViewChild("header") header: ElementRef;
  @ViewChild("headerContainer") headerContainer: ElementRef;
  

  constructor(
    private view:ElementRef
  ) { }

  ngOnInit() {
    
    let elements = this.view.nativeElement.querySelectorAll('.trolado-tab-label');

    for(let i = 0; i < elements.length; i++){

      this.labels.push(elements[i].innerHTML);

    }

    this.contents = this.view.nativeElement.querySelectorAll('.trolado-tab');
    for(let i = 1; i < this.contents.length; i++){
      this.contents[i].classList.add('hidden');
    }
    
    this.wraper = this.view.nativeElement.querySelector('.trolado-tabs-wraper');
    
    this.indicator = this.view.nativeElement.querySelector('.trolado-tabs-indicator');

    this.indicator.style.width = (100/this.labels.length)+'%';
    
    
  }


  ngAfterViewInit(){

    this.labelItem = this.view.nativeElement.querySelectorAll('.trolado-tab-label-item');
    let width:number = 0;
    
    this.labelItem[0].classList.add('active-label');

    for(let i = 0; i < this.labelItem.length; i++){

      width += this.labelItem[i].clientWidth;

    }

    //console.log(this.view.nativeElement.querySelectorAll('.trolado-tab-label-item')[i].clientWidth);

    this.header.nativeElement.style.left = 0;

    this.header.nativeElement.style.right = 0;

    this.header.nativeElement.style.minWidth = width + 'px';

    this.indicator.style.width = this.labelItem[0].clientWidth+'px';
    
  }

  onResize(event){
    let container = this.headerContainer.nativeElement.clientWidth;
    let element = this.header.nativeElement.clientWidth;

    this.header.nativeElement.style.left = '0';

    if(container < element){
      this.arrows = true;
      return true;
    } 


    
    this.arrows = false;
    
    return false;

  }


  exibir(item, event){//EXECUTA TRANSIÇÃO DA TAB

    if(item == this.atual || !this.animable) return;
    
    this.animable = false;    

    this.indicator.style.width = this.labelItem[item].clientWidth+'px';
    
    let translateWidth:number = this.labelItem[item].offsetLeft;

    this.indicator.style.transform = 'translateX('+translateWidth+'px)';

    this.view.nativeElement.querySelectorAll('.trolado-tab-label-item')[this.atual].classList.remove('active-label');
    this.view.nativeElement.querySelectorAll('.trolado-tab-label-item')[item].classList.add('active-label');

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

    if( this.arrows ){//SE HOUVER ARROWS CHAMA O NAVIGATE

      let clientX = event.clientX;
      let headerX = this.headerContainer.nativeElement;

      
      if(clientX - headerX.offsetLeft < 100){
        this.navigate('left');
      } else if(clientX + headerX.offsetLeft > headerX.clientWidth - 100){
        this.navigate('right');
      }

    }
   
  }




  ripple(event, element){
    let elements = this.view.nativeElement.querySelectorAll('.trolado-tab-label-item');

    let div = document.createElement('div');
    div.classList.add('ripple');

    elements[element].appendChild(div);

    div.style.top = (event.layerY)+"px";
    div.style.left = (event.layerX)+"px";

    if(event.target.clientWidth >= event.target.clientHeight){
      
      div.style.transform = 'scale('+(event.target.clientWidth*2.8)/12+')';
    
    } else {
      
      div.style.transform = 'scale('+(event.target.clientHeight*2.8)/12+')';

    }


    setTimeout(()=>div.style.backgroundColor = 'transparent', 400);
    setTimeout(()=>div.remove(), 800);
  }

  navigate(direction){//NAVEGAÇÃO DO HEADER
    let positionLeft = parseInt(this.header.nativeElement.style.left);
    let headerWidth = parseInt(this.header.nativeElement.clientWidth);
    let containerWidth = parseInt(this.headerContainer.nativeElement.clientWidth);

    if(direction == 'right'){

      if((containerWidth - headerWidth) < positionLeft - 80){
        
        this.header.nativeElement.style.left = positionLeft - 80+'px';
      
      } else {

        this.header.nativeElement.style.left = positionLeft + (containerWidth - headerWidth - positionLeft) - 10 + 'px';
      }
      

    } else {
      
      if(positionLeft <= -80){
       
        this.header.nativeElement.style.left = positionLeft + 80+'px';
      
      } else {

        this.header.nativeElement.style.left = positionLeft + (-1*(positionLeft)+ 10) + 'px';
      
      }
      
    }
  }
}
