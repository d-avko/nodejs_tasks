import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TodoListComponent } from './todo-list.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        TodoListComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'todolist-angular'`, () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('todolist-angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('todolist-angular app is running!');
  });
});
