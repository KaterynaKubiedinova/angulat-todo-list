import { TodosService } from './services/todos.services';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IItem } from './models/item';
import { StorageService } from './services/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  title = 'my-first-project';
  data$: Observable<IItem[]>;
  values = '';
  constructor(
    private todosService: TodosService,
    private storageService: StorageService
  ) {
    this.data$ = this.storageService.data$;
  }

  ngOnInit(): void {
    this.todosService.getAll().subscribe((todos) => {
      this.storageService.setData(todos);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.todosService.getAll().subscribe((todos) => {
      this.storageService.setData(todos);
    });
  }
  onKey(event: any) {
    this.values = event.target.value;
  }
  addNew(newTitle: string) {
    const newTodo: IItem = {
      title: newTitle,
      completed: false,
      id: new Date().toDateString(),
    };
    this.todosService.postNew(newTodo);
    console.log('added');
  }
}
