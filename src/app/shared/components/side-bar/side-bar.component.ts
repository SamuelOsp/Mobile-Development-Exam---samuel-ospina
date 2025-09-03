import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from 'src/app/constants/constants';
import { Storage } from '../../services/storage';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { Category } from '../../services/category';
import {
  LoadingController,
  MenuController,
  NavController,
} from '@ionic/angular';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
  standalone: false,
})
export class SideBarComponent implements OnInit {
  user: IUser | null = null;
  categories = [
    { key: 'general', label: 'General' },
    { key: 'business', label: 'Negocios' },
    { key: 'technology', label: 'Tecnología' },
    { key: 'sports', label: 'Deportes' },
    { key: 'science', label: 'Ciencia' },
    { key: 'health', label: 'Salud' },
    { key: 'entertainment', label: 'Entretenimiento' },
  ];

  constructor(
    private storageSrv: Storage,
    private router: Router,
    private categoryService: Category,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.user = this.storageSrv.get<IUser>(CONSTANTS.AUTH);
  }
  async ionViewWillEnter() {
    this.user = this.storageSrv.get<IUser>(CONSTANTS.AUTH);
  }

  selectCategory(category: string) {
    this.categoryService.setCategory(category);
    this.menuCtrl.close();
  }

  async logout() {
    await this.storageSrv.remove(CONSTANTS.AUTH);
    const loading = await this.loadingCtrl.create({
      message: 'Cerrando sesión...',
      duration: 1500,
    });
    await loading.present();

    this.storageSrv.remove(CONSTANTS.AUTH);
    sessionStorage.clear();

    window.location.reload();

    await loading.onDidDismiss();
    this.navCtrl.navigateRoot('/login');
  }

  async goToProfile() {
    const user = await this.storageSrv.get<IUser>(CONSTANTS.AUTH);
    if (user) {
      this.menuCtrl.close();
      this.navCtrl.navigateRoot(['/profile', user.uuid]);
    }
  }
}
