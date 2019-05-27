import { ElementRef, ɵConsole } from '@angular/core';


import { RippleDirective } from './ripple.directive';

describe('RippleDirective', () => {

  let testElement = document.createElement('div');
  
  let elementRef = new ElementRef(testElement);
  
  const renderer2Mock = jasmine.createSpyObj('renderer2Mock', [
    'destroy',
    'createElement',
    'createComment',
    'createText',
    'destroyNode',
    'appendChild',
    'insertBefore',
    'removeChild',
    'selectRootElement',
    'parentNode',
    'nextSibling',
    'setAttribute',
    'removeAttribute',
    'addClass',
    'removeClass',
    'setStyle',
    'removeStyle',
    'setProperty',
    'setValue',
    'listen'
  ]);
  
  let directive = new RippleDirective(elementRef, renderer2Mock);


  beforeAll(() => {
    
    testElement.style.width = '100px';
    testElement.style.height = '90px';

    renderer2Mock.addClass = (elm: HTMLElement, cls: string) =>{
      elm.classList.add(cls);
    }

    renderer2Mock.createElement = (elm: string) =>{
      return document.createElement(elm);
    }

    renderer2Mock.setStyle = (elm: HTMLElement, prop: string, val: any) =>{
      elm.style[prop] = val;
    }
    
    renderer2Mock.appendChild = (elm: HTMLElement, chil: HTMLElement) =>{
      elm.appendChild(chil);
    }
    
  });

  beforeEach(() => {
    testElement.remove();
    testElement = document.createElement('div');
    elementRef = new ElementRef(testElement);
    directive = new RippleDirective(elementRef, renderer2Mock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set element rippable', () => {
    expect(testElement.classList).toContain('ripple-container');
  });

  it('should create ripple inside element', () => {
    let e = new MouseEvent('mouseDown');
    
    testElement.addEventListener('mouseDown',(event) => { 
      directive.mouseDown(event);
    });

    testElement.dispatchEvent(e);
    
    expect(testElement.querySelectorAll('.prevent').length).toBeGreaterThanOrEqual(1);
    expect(testElement.querySelectorAll('.ripple').length).toBeGreaterThanOrEqual(1);
  });

  it('should delete ripple inside element onMouseUp', (done: DoneFn) => {
    let down = new MouseEvent('mouseDown');
    let up = new MouseEvent('mouseup');

    testElement.addEventListener('mouseDown', (event) => { 
      directive.mouseDown(event);
    });

    testElement.dispatchEvent(down);

    testElement.querySelector('.prevent').addEventListener('mouseup', (event) => {
      directive.mouseUp(event)
      .then( result => {

        expect(result).toBe(null);
        done();

      }).catch(e => {

        expect(e).toBe(null);
        done();

      });
    
    });
    testElement.querySelector('.prevent').dispatchEvent(up);
    
  });

  it('should delete ripple inside element onMouseOut', (done: DoneFn) => {
    let down = new MouseEvent('mouseDown');
    let out = new MouseEvent('mouseout');

    testElement.addEventListener('mouseDown', (event) => { 
      directive.mouseDown(event);
    });

    testElement.dispatchEvent(down);

    testElement.querySelector('.prevent').addEventListener('mouseout', (event) => {
      directive.mouseOut(event)
      .then( result => {

        expect(result).toBe(null);
        done();

      }).catch( e => {

        expect(e).toBe(null);
        done();

      });
    });

    testElement.querySelector('.prevent').dispatchEvent(out);
    
  });
  
});
 