import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { Storage } from 'src/app/shared/services/storage';
import { Http } from 'src/app/shared/services/http/http';
import { environment } from 'src/environments/environment';
import { INews, IArticle } from 'src/app/interfaces/new.interface';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { ModalController } from '@ionic/angular';
import { Category } from 'src/app/shared/services/category';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  public news: IArticle[] = [];
  mainArticle: IArticle | null = null;
  currentCategory = 'general';
   loading = false;
  error: string | null = null;

  constructor(
    private readonly storageSrv: Storage,
    private readonly router: Router,
    private httpSrv: Http,
    private modalCtrl: ModalController,
    private categoryService: Category
  ) {}

  async ngOnInit() {
  const response = await this.httpSrv.get<INews>(environment.url);
  this.news = response.articles;
  this.mainArticle = this.news.length ? this.news[0] : null;
    

  this.categoryService.currentCategory$.subscribe(category => {
    this.currentCategory = category;
      this.loadNews(category);
    });
}

  async loadNews(category: string) {
    this.loading = true;
    this.error = null;


try {
   
      const url = `${environment.url}&category=${category}`;
      const response = await this.httpSrv.get<INews>(url);
      this.news = response.articles || [];
      this.mainArticle = this.news.length ? this.news[0] : null;
    } catch (e: any) {
      console.error(e);
      this.error = 'The news could not load correctly, try again';
      this.news = [];
      this.mainArticle = null;
    } finally {
      this.loading = false;
    }
  }

async doRefresh(event: any) {
    const category = this.categoryService['categorySource'].getValue(); 
    await this.loadNews(category);
    event.target.complete();
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


  goBackToMain() {
    this.categoryService.setCategory('general'); 
  }


}
