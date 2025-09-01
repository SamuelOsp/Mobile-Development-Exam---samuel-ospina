import { Injectable } from '@angular/core';
import { LoadingController, SpinnerTypes } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Load {
  constructor(private readonly loadingCtr: LoadingController) { }

  async showLoading(duration:number, message:string, spinner:SpinnerTypes) {
    const loading = this.loadingCtr.create({
      duration: duration,
      message: message,
      spinner: spinner
    });
    (await loading).present();
  }
}