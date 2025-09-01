import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  standalone: false
})
export class LinkComponent {
  @Input() url!: string;

  async openLink() {
    await Browser.open({ url: this.url });
  }

  async closeLink(){
    await Browser.close();
  }
}