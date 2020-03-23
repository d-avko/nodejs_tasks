import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MatDialogRef} from "@angular/material/dialog";
import {TodoListComponent} from "../todo-list.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../AuthService";

@Component({
  selector: 'app-add-todoitem',
  templateUrl: './add-todoitem.component.html',
  styleUrls: ['./add-todoitem.component.scss']
})
export class AddTodoitemComponent implements OnInit {

  ContentControl = new FormControl();
  NameControl = new FormControl();
  UrlControl = new FormControl();

  constructor(private http: HttpClient, public dialogRef: MatDialogRef<TodoListComponent>,
              public snackBar: MatSnackBar, private auth: AuthService) { }

  ngOnInit(): void {
  }


  async CreateItem() {
    try {
      await this.http.put( 'http://localhost:3001/api/todolist', {
        name: this.NameControl.value,
        content: this.ContentControl.value,
        fileUrl: this.UrlControl.value || ''
      },
        {
          headers: this.auth.getAuthorizedHeaders()
        }).toPromise();

      this.dialogRef.close();
    }
    catch (e) {
      this.snackBar.open(e.message, null, {duration: 1500});
    }
  }

  Cancel() {
    this.dialogRef.close();
  }

  async fileSelected($event: Event) {
    let file = (<HTMLInputElement>$event.target).files[0];
    let data = new FormData();
    data.append('ffile', file);

    try {
      let url = await this.http.post<string>( `http://localhost:3001/upload`, data,
        {
          headers: this.auth.getAuthorizedHeaders()
        }).toPromise();

      this.UrlControl.setValue(url);
    }
    catch (e) {
      this.snackBar.open(e.message, null, {duration: 1500});
    }
  }
}
