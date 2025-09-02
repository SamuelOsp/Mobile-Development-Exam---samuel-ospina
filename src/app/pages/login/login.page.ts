import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CONSTANTS } from 'src/app/constants/constants';
import { IUser } from 'src/app/interfaces/user.interface';
import { Storage } from 'src/app/shared/services/storage';
import { Security } from 'src/app/shared/services/security/security';
import { Router } from '@angular/router';
import { Toast } from 'src/app/shared/providers/toast/toast';

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
    private navCtrl: NavController,
    private securitySrv: Security,
    private readonly router: Router,
    private readonly toastSrv: Toast
  ) {
    this.initForm();
  }

  ngOnInit() {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async doLogin() {
    const users = await this.storageSrv.get<IUser[]>(CONSTANTS.USER);

    if (
      !this.email.value ||
      this.email.value.trim() === '' ||
      !this.password.value ||
      this.password.value.trim() === ''
    ) {
      // await this.toastSrv.viewToast('Email and password are required', 3000, 'warning');
      return;
    } else {
      if (!users) {
        await this.toastSrv.viewToast('User not found', 3000, 'warning');
        return;
      }

      const user = users.find((u) => u.email === this.email.value);
      if (!user) {
        await this.toastSrv.viewToast('Invalid credentials', 3000, 'warning');
        return;
      }

      const isValid = await this.securitySrv.comparePassword(
        this.password.value,
        user.password
      );
      if (!isValid) {
        await this.toastSrv.viewToast('Invalid credentials', 3000, 'warning');
        return;
      }

      await this.storageSrv.set(CONSTANTS.AUTH, user);
      this.navCtrl.navigateRoot('/home');
    }
  }

  private initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
}
