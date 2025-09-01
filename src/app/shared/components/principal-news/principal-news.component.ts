import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from 'src/app/interfaces/new.interface';

@Component({
  selector: 'app-principal-news',
  templateUrl: './principal-news.component.html',
  styleUrls: ['./principal-news.component.scss'],
  standalone: false
})
export class PrincipalNewsComponent {
  @Input() article!: IArticle | null;
}
