import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/app/constants/constants';
import { IUser } from 'src/app/interfaces/user.interface';
import { Storage } from '../../services/storage';
import { v4 } from 'uuid';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent implements OnInit {
  public users: IUser[] = [];
  @Input() user!: IUser;
  constructor(
    private readonly router: Router,
    private readonly storageSrv: Storage
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
