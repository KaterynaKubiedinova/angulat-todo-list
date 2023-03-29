import { Component, Input } from '@angular/core';
import { IItem } from 'src/app/models/item';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent {
  @Input() item: IItem;
}
