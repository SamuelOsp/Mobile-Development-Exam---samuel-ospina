import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CONSTANTS } from 'src/app/constants/constants';
import { IUser } from 'src/app/interfaces/user.interface';
import { Toast } from 'src/app/shared/providers/toast/toast';
import { Storage } from 'src/app/shared/services/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  public email!: FormControl;
  public password!: FormControl;
  public loginForm!: FormGroup;

  constructor(
    private readonly storageSrv: Storage,
    private readonly router: Router,
    private readonly toastSrv: Toast,
    private navCtrl: NavController,
  ) {
    this.initForm();
  }

  ngOnInit() {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  public async onLogin() {
  const users = await this.storageSrv.get<IUser[]>(CONSTANTS.USER) || [];
  const user = users.find((u) => u.email === this.email.value);

  if (!user) {
    await this.toastSrv.viewToast('User not found', 3000, 'warning');
    return;
  }

  if (user.password !== this.password.value) {
    await this.toastSrv.viewToast('Password mismatch', 3000, 'danger');
    return;
  }

  if (!user.password || user.password.trim() === '') {
  await this.toastSrv.viewToast('User has no password set', 3000, 'danger');
  return;
}

  await this.storageSrv.set(CONSTANTS.AUTH, user);

  this.navCtrl.navigateRoot('/home');
}

  private initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
}
