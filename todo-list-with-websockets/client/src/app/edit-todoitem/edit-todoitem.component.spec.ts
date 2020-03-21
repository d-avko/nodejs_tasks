import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTodoitemComponent } from './edit-todoitem.component';

describe('EditTodoitemComponent', () => {
  let component: EditTodoitemComponent;
  let fixture: ComponentFixture<EditTodoitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTodoitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
