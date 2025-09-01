import { Component, Input } from '@angular/core';
import { IArticle } from 'src/app/interfaces/new.interface';
import { Platform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false,
})
export class ModalComponent {
  @Input() article: IArticle | null = null;

  constructor(
    private readonly platform: Platform,
    private readonly modalCtrl: ModalController
  ) {}

  setClose() {
    this.modalCtrl.dismiss();
  }

  async abrirNavegador() {
    if (this.platform.is('android') && this.article) {
      await Browser.open({
        url: this.article.url,
        presentationStyle: 'fullscreen'
      });
    }
  }
}
