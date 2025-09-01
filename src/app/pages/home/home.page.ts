import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { Storage } from 'src/app/shared/services/storage';
import { UserService } from 'src/app/shared/services/user-service';
import { CONSTANTS } from 'src/app/constants/constants';
import { v4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  public users: IUser[] = [];

  constructor(
    private readonly storageSrv: Storage,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {

    let users = this.storageSrv.get<IUser[]>(CONSTANTS.USER) || [];
    if (users.length === 0) {
      users = [
        {
          uuid: v4(),
          name: 'pepe',
          lastname: 'gonzalez',
          email: 'pepe@gmail.com',
          password: '1234567890',
        },
        {
          uuid: v4(),
          name: 'maria',
          lastname: 'perez',
          email: 'maria@gmail.com',
          password: '1234567890',
        },
        {
          uuid: v4(),
          name: 'andres',
          lastname: 'gonzalez',
          email: 'andres@gmail.com',
          password: '1234567890',
        },
      ];
      this.storageSrv.set(CONSTANTS.USER, users);
    }

    this.users = users;
  }

  public goToDetail(id: IUser['uuid']) {
    this.router.navigate(['/detail', id]);
  }
}
