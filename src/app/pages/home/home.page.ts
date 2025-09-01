import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { Storage } from 'src/app/shared/services/storage';
import { Http } from 'src/app/shared/services/http/http';
import { environment } from 'src/environments/environment';
import { INews, IArticle } from 'src/app/interfaces/new.interface';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  public news: IArticle[] = [];
  mainArticle: IArticle | null = null;
  constructor(
    private readonly storageSrv: Storage,
    private readonly router: Router,
    private httpSrv: Http,
    private modalCtrl: ModalController
  ) {}

  async ngOnInit() {
  const response = await this.httpSrv.get<INews>(environment.url);
  this.news = response.articles;
  this.mainArticle = this.news.length ? this.news[0] : null;
}
openDetail(article: IArticle) {
  this.router.navigate(['/detail', article.title]); 
}

async openModal(article: IArticle) {
  const modal = await this.modalCtrl.create({
    component: ModalComponent,
    componentProps: { article }
  });
  await modal.present();
}

}
