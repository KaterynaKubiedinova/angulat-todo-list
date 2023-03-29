import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IItem } from '../models/item';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private dataSubject: BehaviorSubject<IItem[]> = new BehaviorSubject([]);
  data$: Observable<IItem[]> = this.dataSubject.asObservable();
  setData(newValue: IItem[]) {
    this.dataSubject.next(newValue);
	}
}
