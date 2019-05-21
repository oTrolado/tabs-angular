import { Component, 
          OnInit, 
          AfterViewInit, 
          AfterViewChecked, 
          ElementRef, 
          ViewChild, 
          Input 
} from '@angular/core';

@Component({
  selector: 'trolado-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit, AfterViewChecked {
  //CONTROLES DE ESTADO
  atual:number = null;
  arrows:boolean = false;
  animable: boolean = true;
  @Input() tabAlign:string;
  @Input() scalable:string;
  @Input() redutive:string;
  plus:boolean = false;
  minus:boolean = false;


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
  @ViewChild("plusLabel") plusLabel: ElementRef;
  @ViewChild("plusBody") plusBody: ElementRef;
  

  constructor(
    private view:ElementRef
  ) { }





  ngOnInit() {
    let elements = this.view.nativeElement.querySelectorAll('.trolado-tab-label');

    if(this.scalable == 'true') this.plus = true;
    if(this.redutive == 'true') this.minus = true;

    for(let i = 0; i < elements.length; i++){

      this.labels.push(elements[i].innerHTML);

    }

    this.contents = this.view.nativeElement.querySelectorAll('.trolado-tab');
    for(let i = 1; i < this.contents.length; i++){
      this.contents[i].classList.add('hidden');
    }
    
    this.wraper = this.view.nativeElement.querySelector('.trolado-tabs-wraper');
    
    this.indicator = this.view.nativeElement.querySelector('.trolado-tabs-indicator');
   
  }









  ngAfterViewInit(){

    this.labelItem = this.view.nativeElement.querySelector('.trolado-tabs-header-labels').children;
    
    let labels = this.view.nativeElement.querySelector('.trolado-tabs-header-labels');

    this.labelItem[0].classList.add('active-label');

    this.header.nativeElement.style.left = 0;

    this.header.nativeElement.style.right = 0;

    this.indicator.style.width = this.labelItem[0].clientWidth+'px';

    if(this.tabAlign == 'center'){

      labels.style.justifyContent = 'center';
      labels.style.display = 'flex';

    } else if(this.tabAlign == 'right'){

      labels.style.justifyContent = 'flex-end';
      labels.style.display = 'flex';

    }

    this.exibir(0, null);
    
  }








  clear(){//LIMPA A BAGUNÇA
    this.labels = [];
    this.atual += 1;
    this.arrows = false;
    setTimeout(()=>this.onResize(null),500);
    this.ngOnInit();
    this.ngAfterViewInit();
  }







  ngAfterViewChecked(){

    let width:number = 0;

    for(let i = 0; i < this.labelItem.length; i++){
      
      width += this.labelItem[i].clientWidth;

    }

    this.header.nativeElement.style.minWidth = width + 'px';
  }








  onResize(event){//Organiza a "casa" quando a "familia" muda de tamanho
    let container = this.headerContainer.nativeElement.clientWidth;
    let element = this.header.nativeElement.clientWidth;

    if(container < element){
      this.arrows = true;
    } else {
      this.arrows = false;
      this.header.nativeElement.style.left = '0';
    }

    if(this.atual){
      this.indicatorTransform(this.labelItem[this.atual].offsetLeft, this.labelItem[this.atual].clientWidth);
    } else {
      this.indicatorTransform(this.labelItem[0].offsetLeft, this.labelItem[0].clientWidth);
    }
    

  }








  exibir(item, event){//EXECUTA TRANSIÇÃO DA TAB

    console.log('!'+ item);
    if(item == this.atual || !this.animable) return;
    
    this.animable = false;  

    if(this.labelItem[this.atual]){

      this.labelItem[this.atual].classList.remove('active-label');
    
    }
    this.labelItem[item].classList.add('active-label');

    this.contents[item].classList.remove('hidden');

    if(item > this.atual){

      this.wraper.classList.add('toRight');
  
    } else {
      
      this.wraper.classList.add('toLeft')
      
    } 

    this.indicatorTransform(this.labelItem[item].offsetLeft, this.labelItem[item].clientWidth);


    setTimeout(()=>{//RESET ---------------------------
      if(this.atual > this.labels.length ){
        this.plusBody.nativeElement.classList.add('hidden');
      } else if(this.atual != null) {
        this.contents[this.atual].classList.add('hidden');
      }
      this.indicatorTransform(this.labelItem[item].offsetLeft, this.labelItem[item].clientWidth);
      this.wraper.classList.remove('toLeft', 'toRight');
      this.atual = item;
      this.animable = true;
    },400);

    
    if( this.arrows ){//SE HOUVER ARROWS CHAMA O NAVIGATE
      if(event){
        let clientX = event.clientX;
        let headerX = this.headerContainer.nativeElement;
      
      
        if(clientX - headerX.offsetLeft < 100){
          this.navigate('left');
        } else if(clientX + headerX.offsetLeft > headerX.clientWidth - 100){
          this.navigate('right');
        }
      }  
    }
  }






  


  criarTAB(event){//CRIA UM NOVA TAB
    setTimeout(()=> {
      this.plusLabel.nativeElement.querySelector('input').focus();
    }, 500);


    if(this.atual > this.labels.length ||
      !this.animable) return false;

    this.animable = false;

    if(this.labelItem[this.atual]){

      this.labelItem[this.atual].classList.remove('active-label');
    
    }
    this.navigate('right');
    this.navigate('right');
    
    this.plusLabel.nativeElement.innerHTML = "<input class='label-input' placeholder='Title'>";

    

    this.plusBody.nativeElement.classList.remove('hidden');

    this.wraper.classList.add('toRight');

    this.indicatorTransform(event.path[1].offsetLeft, event.path[1].clientWidth);

    setTimeout(()=>{//RESET
      if(this.atual == null){

        this.contents[0].classList.add('hidden');
      
      } else {
        this.contents[this.atual].classList.add('hidden');
      }
      this.wraper.classList.remove('toLeft', 'toRight');
      this.animable = true;
      this.atual = this.labels.length + 1;
    },500);
  }







  abortTAB(){

    this.plusLabel.nativeElement.innerHTML = '<i class="fas fa-plus"></i>';
    this.plusBody.nativeElement.querySelector('textarea').value = '';
    console.log();
    setTimeout(() => this.exibir(this.labelItem.length - 2, null), 400);

  }







  saveTAB(){//SALVA A NOVA TAB

    let tab = document.createElement('div');
      tab.classList.add('trolado-tab');

    let head = document.createElement('div');
      head.classList.add('trolado-tab-label');
      head.innerText = this.plusLabel.nativeElement.querySelector('input').value;

    let body = document.createElement('div');
      body.classList.add('trolado-tab-content');
      body.innerHTML = this.plusBody.nativeElement.querySelector('textarea').value;

    tab.appendChild(head);
    tab.appendChild(body);

    this.wraper.insertBefore(tab, this.wraper.lastChild);

    this.clear();

    this.abortTAB();
  }






  delete(item){

    console.log(this.view.nativeElement.querySelectorAll('.trolado-tab-label')[item]);
    this.view.nativeElement.querySelectorAll('.trolado-tab-label')[item].remove();
    this.clear();
//    this.labels.splice(item, 1);

  }








  indicatorTransform(translate, width){
    this.indicator.style.width = width+'px';
    this.indicator.style.transform = 'translateX('+translate+'px)';

  }









  ripple(event){

   let element;

    event.path.map((item, index) => {//MAPEIA O ELEMENTO A SER ANIMADO
      if(item.classList != null){
        if(item.classList.contains('clickArea')){

          element = event.path[index+1];

        }
      }
    });

    let div = document.createElement('div');
    div.classList.add('ripple');

    element.appendChild(div);

    div.style.top = (event.layerY)+"px";
    
    div.style.left = (event.layerX)+"px";

    if(event.target.clientWidth >= event.target.clientHeight){	

      div.style.transform = 'scale('+(event.target.clientWidth*2.8)/12+')';	

    } else {

      div.style.transform = 'scale('+(event.target.clientHeight*2.8)/12+')';

    }
      
    setTimeout(()=>div.style.backgroundColor = 'transparent', 400);//RESET
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

        this.header.nativeElement.style.left = positionLeft + (containerWidth - headerWidth - positionLeft) - 19 + 'px';
      }
      

    } else {
      
      if(positionLeft <= -80){
       
        this.header.nativeElement.style.left = positionLeft + 80+'px';
      
      } else {

        this.header.nativeElement.style.left = positionLeft + (-1*(positionLeft)+ 19) + 'px';
      
      } 
    }
  }
}
