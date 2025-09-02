import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from 'src/app/constants/constants';
import { Storage } from '../../services/storage';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { Category } from '../../services/category';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false
})
export class SideBarComponent  implements OnInit {

  categories = [
    { key: 'general', label: 'General' },
    { key: 'business', label: 'Negocios' },
    { key: 'technology', label: 'Tecnología' },
    { key: 'sports', label: 'Deportes' },
    { key: 'science', label: 'Ciencia' },
    { key: 'health', label: 'Salud' },
    { key: 'entertainment', label: 'Entretenimiento' },
  ];

  constructor(private storage: Storage, private router: Router, private categoryService: Category,
    private menuCtrl: MenuController,
  ) { }

  ngOnInit() {}

selectCategory(category: string) {
    this.categoryService.setCategory(category);
    this.menuCtrl.close(); 
  }
  
  async logout() {
  await this.storage.remove(CONSTANTS.AUTH); 
  this.router.navigate(['/login']); 
}


   goToProfile() {
  const user = this.storage.get<IUser>(CONSTANTS.AUTH);
  if (user) {
    this.router.navigate(['/profile', user.uuid]);
  }
}
}
