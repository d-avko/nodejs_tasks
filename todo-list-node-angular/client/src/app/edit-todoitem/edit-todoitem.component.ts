import {AfterContentInit, Component, Inject, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TodoListComponent} from "../todo-list.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../AuthService";

@Component({
  selector: 'app-edit-todoitem',
  templateUrl: './edit-todoitem.component.html',
  styleUrls: ['./edit-todoitem.component.scss']
})
export class EditTodoitemComponent implements AfterContentInit, OnInit {
  @Input() id: number;
  @Input() name: String;
  @Input() content: String;
  @Input() status: number;
  @Input() fileUrl: String;

  ContentControl = new FormControl();
  NameControl = new FormControl();
  UrlControl = new FormControl();
  StatusControl = new FormControl();
  options = [ "Created", "In Progress", "Completed"];

  constructor(private http: HttpClient, @Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<TodoListComponent>,
              public snackBar: MatSnackBar, public auth: AuthService) {
    this.id = data.id;
    this.name = data.name;
    this.fileUrl = data.fileUrl;
    this.content = data.content;
    this.status = data.status;
  }

  ngOnInit(): void {

  }

  ngAfterContentInit(){
    this.ContentControl.setValue(this.content);
    this.NameControl.setValue(this.name);
    this.UrlControl.setValue(this.fileUrl);

    if(this.status > this.options.length - 1 || this.status < 0){
      this.StatusControl.setValue("Unknown");
    }else{
      this.StatusControl.setValue(this.options[this.status]);
    }
  }

  async EditItem() {
    try {
      await this.http.patch( `http://localhost:3001/api/todolist/${this.id}`, {
        name: this.NameControl.value,
        content: this.ContentControl.value,
        status: this.options.indexOf(this.StatusControl.value),
        fileUrl: this.UrlControl.value
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
