import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticle, INews } from 'src/app/interfaces/new.interface';
import { Http } from '../../services/http/http';
import { LoadingController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-principal-news',
  templateUrl: './principal-news.component.html',
  styleUrls: ['./principal-news.component.scss'],
  standalone: false
})
export class PrincipalNewsComponent {
  @Input() articles: IArticle[] = [];
  @Output() select = new EventEmitter<IArticle>();
  public data:INews | null = null;
  constructor(private readonly http:Http, private readonly loadingCtr:LoadingController) { }

    ngOnInit() {
    if (!this.data) {
      this.showLoading();
    }
    this.loadPrincipalNews();
  }

  async loadPrincipalNews(){
    const url = environment.url;
    this.data = await this.http.get<INews>(url);
  }

  async showLoading(){
    const loading = this.loadingCtr.create({
      duration: 3000,
      message: 'Loading data',
      spinner: 'circles'
    });
    (await loading).present();
  }

  getInfo(index:number): IArticle | null{
    if (this.data) {
      return this.data.articles[index];
    }
    return null;
  }

}
