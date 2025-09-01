import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Http {
  constructor(private readonly HttpClient: HttpClient){}

  async get <T>(url: string): Promise<T>{
    return new Promise((resolve, reject) =>{
      this.HttpClient.get<T>(url).subscribe({
        next(value){
          resolve(value);
        },
        error(err){
          reject(err);
        },
      });
    });
  }


}
