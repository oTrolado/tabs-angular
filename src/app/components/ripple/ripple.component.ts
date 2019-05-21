import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trolado-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.scss']
})
export class RippleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

   
}
