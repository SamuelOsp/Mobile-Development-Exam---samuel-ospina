import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/app/constants/constants';
import { IUserr } from 'src/app/interfaces/user.interface';
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
    private readonly toastSrv: Toast
  ) {
    this.initForm();
  }

  ngOnInit() {}

  goToRegister() {
    this.router.navigate(['/register']);
  }

  public async onLogin() {
    console.log(this.loginForm.value);
    const users = this.storageSrv.get<IUserr[]>(CONSTANTS.USER) || [];
    console.log(users);

    const user = users.find((u) => u.email === this.email.value);
    if (!user) {
      await this.toastSrv.viewToast('should fill all', 3000, 'warning');
      return;
    }

    const isValidPassword = user.password === this.password.value;
    if (isValidPassword) {
      this.storageSrv.set('AUTH',{
        uuid: user.uuid,
      });
      return this.router.navigate(['/home2']);
    }

    
    await this.toastSrv.viewToast('password mismatch', 3000, 'danger');
    return;
  }

  private initForm() {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }
}
