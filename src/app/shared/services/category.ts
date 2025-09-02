import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Category {
  private categorySource = new BehaviorSubject<string>('general');
  currentCategory$ = this.categorySource.asObservable();

  setCategory(category: string) {
    this.categorySource.next(category);
  }
}
