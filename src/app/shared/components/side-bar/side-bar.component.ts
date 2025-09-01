import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from 'src/app/constants/constants';
import { Storage } from '../../services/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false
})
export class SideBarComponent  implements OnInit {

  constructor(private storage: Storage, private router: Router) { }

  ngOnInit() {}


  logout() {
    this.storage.remove(CONSTANTS.AUTH); 
    this.router.navigate(['/login']);    
  }
}
