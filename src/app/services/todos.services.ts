import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IItem } from '../models/item';
import { BASE_URL } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}
  getAll(): Observable<IItem[]> {
    return this.http.get<IItem[]>(BASE_URL);
	}
	postNew(todo: IItem) {
		return this.http.post<IItem[]>(BASE_URL, todo);
	}
	deleteItem(id: string) {
		return this.http.delete(BASE_URL + '/' + id);
	}
	updateItem(newItem: IItem) {
		return this.http.put(BASE_URL+ '/' + newItem.id, newItem);
	}
}
