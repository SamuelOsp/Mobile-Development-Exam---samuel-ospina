import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Toast {
  constructor(private readonly toast: ToastController){}

  async viewToast(message: string, duration:number = 2000, color: 'danger' | 'warning' | 'primary'){
    const toast = await this.toast.create({
      message: message,
      duration: duration,
      position: 'bottom',
      color: color
    });
    toast.present();
  }
  
}
