import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[ripple]'
})
export class RippleDirective {

  @HostListener('mousedown', ['$event']) mouseDown(event){
    let target = event.target;

    let prevent = document.createElement('div');
    prevent.classList.add('prevent');

    let ripple = document.createElement('div');
    ripple.classList.add('ripple');

    if(target.classList.contains('ripple') || target.classList.contains('prevent')){
      target.parentNode.appendChild(prevent);
      target.parentNode.appendChild(ripple);
    } else {
      target.appendChild(prevent);
      target.appendChild(ripple);
    }
    ripple.style.top = (event.layerY)+"px";
    
    ripple.style.left = (event.layerX)+"px";

    if(target.clientWidth >= target.clientHeight){	

      ripple.style.transform = 'scale('+(this.elementRef.nativeElement.clientWidth*2.8)/12+')';	

    } else {

      ripple.style.transform = 'scale('+(this.elementRef.nativeElement.clientHeight*2.8)/12+')';

    }

    setTimeout(()=>ripple.style.backgroundColor = 'transparent', 400);//RESET
    setTimeout(()=>{
      ripple.remove();
      prevent.remove();
    }, 800);
  }

  constructor(
    private elementRef: ElementRef
  ) { }

}
