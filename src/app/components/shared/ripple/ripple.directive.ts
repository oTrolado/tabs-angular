import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ripple]'
})
export class RippleDirective {


  ripple:any;
  prevent:any;

  @HostListener('mousedown', ['$event']) mouseDown(event){//DISPARA O RIPPLE AO CLIQUE
    let target = event.target;

    this.prevent = document.createElement('div');
    this.prevent.classList.add('prevent');

    this.ripple = document.createElement('div');
    this.ripple.classList.add('ripple');

    if(target.classList.contains('ripple') || target.classList.contains('prevent')){
      target.parentNode.appendChild(this.prevent);
      target.parentNode.appendChild(this.ripple);
    } else {
      target.appendChild(this.prevent);
      target.appendChild(this.ripple);
    }
    this.ripple.style.top = (event.layerY)+"px";
    
    this.ripple.style.left = (event.layerX)+"px";

    if(target.clientWidth >= target.clientHeight){	

      this.ripple.style.transform = 'scale('+(this.elementRef.nativeElement.clientWidth*2.8)/12+')';	

    } else {

      this.ripple.style.transform = 'scale('+(this.elementRef.nativeElement.clientHeight*2.8)/12+')';

    }

  }

  @HostListener('mouseup',['$event']) mouseUp(event){//REMOVE O RIPPLE AO MOUSE UP

    if(event.target.classList.contains('prevent')){

      setTimeout(() => {

        try{
          event.target.nextSibling.style.backgroundColor = 'transparent';
        } catch{/*o ripple ja foi removido*/}

      }, 200);//RESET

      setTimeout(()=>{

        try{
          event.target.nextSibling.remove();
          event.target.remove();
        } catch{/*o ripple ja foi removido*/}
      }, 600);

    }

  }

  @HostListener('mouseout',['$event']) mouseOut(event){//REMOVE O RIPPLE AO MOUSE OUT
    if(event.fromElement.classList.contains('prevent')){

      setTimeout(() => {

          try{
            event.fromElement.nextSibling.style.backgroundColor = 'transparent';
          } catch{/*o ripple ja foi removido*/}

        },200);//RESET

        setTimeout(()=>{

          try {
            event.target.nextSibling.remove();
            event.target.remove();
          } catch{/*o ripple ja foi removido*/}

        }, 600);

    }
  }

  constructor(
    private elementRef: ElementRef,
  ) { 
    this.elementRef.nativeElement.classList.add('ripple-container');
  }

}
