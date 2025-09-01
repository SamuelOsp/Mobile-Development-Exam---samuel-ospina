import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IArticle } from 'src/app/interfaces/new.interface';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent {
 @Input() title:string = '';
  @Input() urlImg:string = '';
  @Input() author:string = '';
  @Input() description:string = '';
  @Input() date:string = '';
  @Input() data:IArticle | null  = null;
  isOpenModal:boolean = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}
  closeModal(isClose:boolean){
    this.isOpenModal = isClose;
  }

   async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        article: this.data,
      },
    });

    await modal.present();
  }


}