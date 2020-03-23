import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoitemComponent } from './add-todoitem.component';

describe('AddTodoitemComponent', () => {
  let component: AddTodoitemComponent;
  let fixture: ComponentFixture<AddTodoitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTodoitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodoitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
