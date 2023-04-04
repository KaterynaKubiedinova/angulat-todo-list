import { Component, DoCheck, Input } from '@angular/core';
import { IItem } from 'src/app/models/item';
import { StorageService } from 'src/app/services/storage.service';
import { TodosService } from 'src/app/services/todos.services';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent {
  @Input() item: IItem;
  isEdit: boolean = false;
  value: string = '';
  constructor(private todoService: TodosService, private storageService: StorageService){}
  deleteTodo() {
    this.todoService.deleteItem(this.item.id).subscribe(() => {
      this.todoService.getAll().subscribe((todos) => {
        this.storageService.setData(todos);
      });
    });;
  }
  setCompleted() {
    const newTodo = {...this.item, completed: !this.item.completed}
    console.log(newTodo)
    this.todoService.updateItem(newTodo).subscribe(() => {
      this.todoService.getAll().subscribe((todos) => {
        this.storageService.setData(todos);
      });
    });
  }
  handleSave() {
    console.log(this.value)
    const newTodo = {
      ...this.item,
      title: this.value,
      completed: false
    }
    if (newTodo.title !== this.item.title) {
      this.todoService.updateItem(newTodo).subscribe(() => {
        this.todoService.getAll().subscribe((todos) => {
          this.storageService.setData(todos);
        });;
      })
      console.log(newTodo)
      this.isEdit = false;
    }
  }
  handleEdit() {
    this.value = this.item.title;
    this.isEdit = true;
  }
  onKey(event: any) {
    this.value = event.target.value;
  }
}
