import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-todoitem',
  templateUrl: './todoitem.component.html',
  styleUrls: ['./todoitem.component.scss']
})
export class TodoitemComponent implements OnInit {
  @Input() id: number;
  @Input() name: String;
  @Input() content: String;
  @Input() status: number;
  @Input() fileUrl: string;

  @Output() onDeleteItem = new EventEmitter<number>();
  @Output() onEditItem = new EventEmitter<number>();
  @Output() onDownloadFile = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  getStatusString(status: number) {
    switch(status){
      case 0:{
        return "Created"
      }
      case 1:{
        return "In Progress"
      }
      case 2:{
        return "Completed"
      }
    }
  }

  DeleteItem() {
    this.onDeleteItem.emit(this.id);
  }

  EditItem() {
    this.onEditItem.emit(this.id);
  }

  DownloadItem(){
    this.onDownloadFile.emit(this.id);
  }
}
