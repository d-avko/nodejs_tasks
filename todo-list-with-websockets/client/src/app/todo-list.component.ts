import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatDialog} from "@angular/material/dialog";
import {AddTodoitemComponent} from "./add-todoitem/add-todoitem.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditTodoitemComponent} from "./edit-todoitem/edit-todoitem.component";
import {Router} from "@angular/router";
import {AuthService} from "./AuthService";
import {TodoItem} from "./todo.item";
import {SocketsService} from "./SocketsService";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-todolist',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy{
  constructor(private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar,
              private router: Router, private auth: AuthService,
              private socketsService: SocketsService) {
  }

  title = 'todolist-angular';

  items: Array<TodoItem>;

  todoItemsSub : Subscription;

  async ngOnInit(){
    if(!this.auth.authorized()){
      await this.router.navigateByUrl('/login');
      return;
    }

    this.todoItemsSub = this.socketsService.todoItemsReceived.subscribe(x => {
      if(x.error){
        this.snackBar.open(x.error);
        return
      }

      this.items = x.data;
      console.log(this.items)
    });

    this.socketsService.getTodoItems();
  }

  CreateItem(){
    const dialogRef = this.dialog.open(AddTodoitemComponent, {
      width: '350px'
    });

    dialogRef.afterClosed()
      .subscribe(async x => await this.ngOnInit());
  }

  OnEditItem(id: number) {
    let item = this.items.find(x => x.id == id);

    const dialogRef = this.dialog.open(EditTodoitemComponent, {
      width: '350px',
      data: {
        id: item.id,
        name: item.name,
        content: item.content,
        status: item.status
      }
    });

    dialogRef.afterClosed()
      .subscribe(async x => await this.ngOnInit());
  }

  async OnDeleteItem(item: number) {
    try {
      await this.http.delete<any>(`http://localhost:3001/api/todolist/${item}`,{
        headers: this.auth.getAuthorizedHeaders()
      })
        .toPromise();

      await this.ngOnInit()
    }
    catch (e) {
      this.snackBar.open(e.message, null, {duration: 1500});
    }
  }

  GotoLoginPage() {
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy(): void {
    if(this.todoItemsSub){
      this.todoItemsSub.unsubscribe()
    }
  }
}
