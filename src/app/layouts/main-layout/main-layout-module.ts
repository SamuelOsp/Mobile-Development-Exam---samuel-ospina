import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from './main-layout.component';
import { SharedModule } from 'src/app/shared/shared-module';


@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    SharedModule 
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class MainLayoutModule { }
