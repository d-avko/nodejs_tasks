import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { OnInit } from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {AddTodoitemComponent} from "./add-todoitem/add-todoitem.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {EditTodoitemComponent} from "./edit-todoitem/edit-todoitem.component";
import {Router} from "@angular/router";
import {AuthService} from "./AuthService";

class TodoItem{
  id: number;
  name: String;
  content: String;
  status: number;
  created_at: Date;
  modified_at: Date;
  file_url: string;
}

@Component({
  selector: 'app-todolist',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit{
  constructor(private http: HttpClient, public dialog: MatDialog, private snackBar: MatSnackBar,
              private router: Router, private auth: AuthService) {
  }

  title = 'todolist-angular';

  items: Array<TodoItem>;

  async ngOnInit(){
    if(!this.auth.authorized()){
      await this.router.navigateByUrl('/login');
      return;
    }

    let result = await this.http.get<{data:{todolist: Array<TodoItem>}}>(`http://localhost:3001/api/todolist`,
      {
        headers: this.auth.getAuthorizedHeaders()
      })
      .toPromise();

    this.items = result.data.todolist;

    console.log(this.items)
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
        status: item.status,
        fileUrl: item.file_url
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

  async DownloadFile(id: number) {
    let item = this.items.find(x => x.id == id);

    let blob = await this.http.get("http://localhost:3001" + item.file_url, {responseType: "blob"}).toPromise();

    const url = window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.download = `${item.file_url.substr(1)}`;
    a.href = url;
    a.click();
  }
}
