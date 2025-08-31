import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Storage {
  set(key: string, data: string): void{
    localStorage.setItem(key, data);
  }

  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if(!data) return null;
    return JSON.parse(data) as T;
  }
}
