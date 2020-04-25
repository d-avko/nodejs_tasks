import * as io from 'socket.io-client';
import {TodoitemComponent} from "./todoitem/todoitem.component";
import {EventEmitter, Injectable} from "@angular/core";
import {AuthService} from "./AuthService";

@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  public todoItemsReceived = new EventEmitter<{success: boolean, error: string, data: Array<TodoitemComponent>}>();
  //private socket = io('http://localhost');


  constructor(private auth: AuthService) {

  }

  public getTodoItems(){
   // this.socket.emit('GetTodoItems', this.auth.getToken(), (data) => {
    //  this.todoItemsReceived.emit(data)
   // });
  }
}
