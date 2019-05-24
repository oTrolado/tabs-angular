import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, ElementRef } from '@angular/core';

import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
  let element = document.createElement('div');
  let elementRef = new ElementRef(element);
  let component = new TabsComponent(elementRef);
  let fixture: ComponentFixture<TabsComponent>;
/*
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
  });
*/
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
