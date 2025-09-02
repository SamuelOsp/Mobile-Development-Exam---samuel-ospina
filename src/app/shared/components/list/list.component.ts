import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: false
})
export class ListComponent  implements OnInit {
  @Input() items: { key: string; label: string }[] = [];
  @Output() itemSelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {}
selectItem(key: string) {
    this.itemSelected.emit(key);
  }
}
