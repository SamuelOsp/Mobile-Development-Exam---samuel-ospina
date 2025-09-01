import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IArticle } from 'src/app/interfaces/new.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: false,
})
export class CardComponent {
  @Input() article!: IArticle;
  @Output() select = new EventEmitter<IArticle>();

  onClick() {
    this.select.emit(this.article);
  }
}