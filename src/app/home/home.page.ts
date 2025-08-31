import { Component } from '@angular/core';
import { Storage } from '../shared/services/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  
  constructor(private readonly storageSrv: Storage) {

  }

}
