import { Component, OnInit } from '@angular/core';
import { Category } from '../../services/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {
loading = false;
  error: string | null = null;
  constructor( private categoryService: Category) { }

  ngOnInit() {
    this.categoryService.currentCategory$.subscribe(category => {
      this.loadNews(category);
    });
  }
  async loadNews(category: string) {
    this.loading = true;
    this.error = null;
  }


 
}
