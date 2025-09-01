import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/interfaces/new.interface';
import { InAppBrowser } from '@capacitor/inappbrowser';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: false,
})
export class ModalComponent {
  @Input() article!: IArticle;

  constructor(private modalCtrl: ModalController) {}

  async openLink() {
    await InAppBrowser.openInExternalBrowser({
      url: this.article.url,
    });
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
}
