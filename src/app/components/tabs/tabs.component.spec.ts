import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let element = document.createElement('span');
  let elementRef = new ElementRef(element);
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;

  // MOCKS
  let labelMock: any;
  let contentMock: any;
  let textareaMock: any;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ TabsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    labelMock = [];
    for(let i = 0; i < 10; i++){
      let tmp = document.createElement('div');
      tmp.innerText = 'Label '+i;
      labelMock.push(tmp);
      component.labels.push(tmp.innerText);
    }
    component.labelItem = labelMock;

    contentMock = [];
    for(let i = 0; i < 10; i++){
      let tmp = document.createElement('div');
      tmp.innerHTML = 'Content '+i;
      contentMock.push(tmp);
    }
    component.contents = contentMock;

    textareaMock = document.createElement('div');
    textareaMock.classList.add('textarea');

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set labels innactive', () => {
    
    labelMock.map(label => label.classList.add('active-label'))
    component.labelItem = labelMock;
    
    let ret = component.deactivateLabels(0);

    ret.map(item =>  expect(item.classList.length).toBe(0));
    
  });

  it('should change tab', (done: DoneFn) => {
    
    

    component.exibir(4, labelMock[4])
    .then((ret) => {
      expect(ret).toBe(contentMock[4]);
      done();
    })
    .catch((err) => {
      console.error(err)
      done();
    });

  });

  it('should abort tab creation', () => {
    
    expect(component.abortTAB(textareaMock)).toBe(textareaMock);
    expect(textareaMock.innerHTML).toBe('--Me Edite--');

  });

  it('should save a new tab', (done:DoneFn)=>{

    let plusMock:HTMLElement = document.createElement('div');
    let input:HTMLElement = document.createElement('div');

    input.classList.add('label-input');
    input.innerHTML = 'Label Fake';
    plusMock.appendChild(input);

    textareaMock.innerHTML = 'Fake Content';
    
    component.saveTAB(plusMock, textareaMock)
    .then((ret) => {
      
      component.labelItem = labelMock;
      expect(JSON.stringify(ret))
      .toContain(JSON.stringify({ title: 'Label Fake', body: 'Fake Content' }));
      
      done();
    })
    .catch((err) => {
      console.error(err);
      done();
    });

  });

  it('should delete a tab', (done:DoneFn) => {

    const event:Event = new Event('click');
    const obj:number = Math.floor(Math.random() * (contentMock.length - 0));

    component.del = true;

    component.delete(obj, event)
    .then( ret => {
      expect(ret).toBe(contentMock[obj]);
      done();
    })
    .catch(e =>{
      console.error(e);
      done();
    });

  });
});
