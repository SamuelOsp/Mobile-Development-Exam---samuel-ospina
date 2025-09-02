import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS } from 'src/app/constants/constants';
import { IUser } from 'src/app/interfaces/user.interface';
import { Storage } from 'src/app/shared/services/storage';
import { v4 } from 'uuid';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  public name!: FormControl;
  public lastname!: FormControl;
  public email!: FormControl;
  public password!: FormControl;
  public registerForm!: FormGroup;

  constructor(
    private readonly storageSrv: Storage,
    private readonly router: Router
  ) {
    this.initForm();
  }

  ngOnInit() {}

  public doRegister() {
    console.log(this.registerForm.value);
    let users = this.storageSrv.get<IUser[]>(CONSTANTS.USER);
    if (!users) {
      users = [];
    }
    const exists = users.find((user) => user.email == this.email.value);
    if (exists) throw new Error('The email exist already');

    users.push({
      uuid: v4(),
      name: this.name.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
    });
    this.storageSrv.set(CONSTANTS.USER, users);
    this.registerForm.reset();
    this.router.navigate(['/login']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.lastname = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
    this.registerForm = new FormGroup({
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
    });
  }
}
