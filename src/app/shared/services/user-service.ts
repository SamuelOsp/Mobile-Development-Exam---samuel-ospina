import { Injectable } from '@angular/core';
import { IUser, IUserLogin } from 'src/app/interfaces/IUser';
import { Storage } from '../providers/storage/storage';




@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly localStorageSrv: Storage) {}

  login(user: IUserLogin): void {
    let users = this.localStorageSrv.get<IUser[]>('users');
    if (!users) {
      users = [];
    }

    const userFound = users.find((u) => u.email === user.email);
    if (!userFound) {
      throw new Error('user not found');
    }

    if (userFound.password !== user.password) {
      throw new Error('password mismatch');
    }

    this.localStorageSrv.set(
      'auth',
      JSON.stringify({
        id: '123',
      })
    );    
  }


    signUp(user: IUser ){
      let users= this.localStorageSrv.get<IUser[]>('users');
      if(!users){
        users = [];
      }
      const isEmailExist = users.find((u) => u.email === user.email);

      if(isEmailExist){
        throw new Error('Email already exist');
      }
      users.push(user);
      this.localStorageSrv.set('users', JSON.stringify(users));

    }


}
