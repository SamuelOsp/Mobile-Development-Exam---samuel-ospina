import { Injectable } from '@angular/core';
import { IUser, IUserLogin } from 'src/app/interfaces/user.interface';
import { Storage } from './storage';
import { CONSTANTS } from 'src/app/constants/constants';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly localStorageSrv: Storage) {}

  login(user: IUserLogin): void {
    let users = this.localStorageSrv.get<IUser[]>(CONSTANTS.USER) || [];

    const userFound = users.find((u) => u.email === user.email);
    if (!userFound) throw new Error('user not found');

    if (userFound.password !== user.password) {
      throw new Error('password mismatch');
    }

    this.localStorageSrv.set(CONSTANTS.AUTH, {
      uuid: userFound.uuid,
      email: userFound.email,
    });
  }

  signUp(user: IUser): void {
    let users = this.localStorageSrv.get<IUser[]>(CONSTANTS.USER) || [];

    const isEmailExist = users.some((u) => u.email === user.email);
    if (isEmailExist) throw new Error('Email already exists');

    users.push(user);
    this.localStorageSrv.set(CONSTANTS.USER, users);
  }
}
