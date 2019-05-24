import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ripple]'
})
export class RippleDirective {


  ripple:HTMLElement;
  prevent:HTMLElement;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { 
    this.renderer.addClass(
        this.elementRef.nativeElement,
        'ripple-container'
    );
  }


  @HostListener('mousedown', ['$event']) mouseDown(event){//DISPARA O RIPPLE AO CLIQUE
    let target = event.target;
    
    this.prevent = this.renderer.createElement('div');
    this.renderer.addClass(this.prevent, 'prevent');

    this.ripple = this.renderer.createElement('div');
    this.renderer.addClass(this.ripple, 'ripple');

    if(target.classList.contains('ripple') || target.classList.contains('prevent')){
        this.renderer.appendChild(target.parentNode, this.prevent);
        this.renderer.appendChild(target.parentNode, this.ripple);
    } else {
        this.renderer.appendChild(target, this.prevent);
        this.renderer.appendChild(target, this.ripple);
    }

    this.renderer.setStyle(this.ripple, 'top', (event.layerY)+"px");

    this.renderer.setStyle(this.ripple, 'left', (event.layerX)+"px");

    
    if(target.clientWidth >= target.clientHeight){	
        
        this.renderer.setStyle(
            this.ripple, 
            'transform', 
            'scale('+(this.elementRef.nativeElement.clientWidth*2.4)/12+')');

    } else {

        this.renderer.setStyle(
            this.ripple, 
            'transform', 
            'scale('+(this.elementRef.nativeElement.clientHeight*2.4)/12+')');

    }

  }

  @HostListener('mouseup',['$event']) mouseUp(event){//REMOVE O RIPPLE AO MOUSE UP

    if(event.target.classList.contains('prevent')){

      setTimeout(() => {

        try{
            this.renderer.setStyle(
                event.target.nextSibling,
                'backgroundColor',
                'transparent'
                );
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
            this.renderer.setStyle(
                event.fromElement.nextSibling,
                'backgroundColor',
                'transparent'
                );
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

  

}
