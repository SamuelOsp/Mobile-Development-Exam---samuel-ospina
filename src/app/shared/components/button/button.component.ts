import { Component, Input, OnInit } from '@angular/core';

type buttonType = 'submit' | 'reset';
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: false
})
export class ButtonComponent  implements OnInit {
@Input() type:buttonType = 'submit';
@Input() color:string = '';
@Input() value:string = '';

  constructor() { }

  ngOnInit() {}

}
