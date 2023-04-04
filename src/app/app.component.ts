import { TodosService } from './services/todos.services';
import { Component, OnChanges, OnInit, SimpleChanges, DoCheck, AfterViewInit } from '@angular/core';
import { IItem } from './models/item';
import { StorageService } from './services/storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
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
    this.data$.subscribe((todos) => {
      console.log('on init, ',todos);
    });
    this.todosService.getAll().subscribe((todos) => {
      this.storageService.setData(todos);
    });
  }

  onKey(event: any) {
    this.values = event.target.value;
  }
  addNew() {
    const newTodo: IItem = {
      title: this.values,
      completed: false,
      id: '',
    };
    const oldTodo = this.data$.subscribe(todos => todos);
    this.todosService.postNew(newTodo).subscribe(() => {
      this.todosService.getAll().subscribe((todos) => {
        this.storageService.setData(todos);
      });
    });
    this.values = '';
  }
}

