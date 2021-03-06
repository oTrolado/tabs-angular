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

    const height = this.elementRef.nativeElement.clientHeight;  
    const width = this.elementRef.nativeElement.clientWidth;
    const size = Math.sqrt(height**2 + width**2); 
    console.log(height + ' ' + width + ' ' + (size));
    this.renderer.setStyle(
        this.ripple, 
        'transform', 
        'scale('+(size)/5.5+')'
        );
        return this.elementRef.nativeElement;

  }

  @HostListener('mouseup',['$event']) mouseUp(event){//REMOVE O RIPPLE AO MOUSE UP
    
    if(event.target.classList.contains('prevent')){

      return new Promise( resolve => {
        setTimeout(() => {
            if(event.target ? event.target.nextSibling : false){
              this.renderer.setStyle(
                  event.target.nextSibling,
                  'backgroundColor',
                  'transparent'
                  );
            }
        }, 200);//RESET
  
        setTimeout(()=>{
  
          if(event.target){
            if(event.target.nextSibling) event.target.nextSibling.remove();
            event.target.remove();
          }
          resolve(event.target);
        }, 600);
        
      }); 
    }
  }

  @HostListener('mouseout',['$event']) mouseOut(event){//REMOVE O RIPPLE AO MOUSE OUT

    if(event.fromElement.classList.contains('prevent')){
     
      return new Promise((resolve, reject) => {
        setTimeout(() => {

          if(event.fromElement ? event.fromElement.nextSibling : false){
            this.renderer.setStyle(
                event.fromElement.nextSibling,
                'backgroundColor',
                'transparent'
                );
          }

        },200);//RESET

        setTimeout(()=>{
          if(event.target){
            if(event.target.nextSibling) event.target.nextSibling.remove();
            event.target.remove();
          }
          resolve(event.target);
        }, 600);
        
      });
    }
  }

  

}
