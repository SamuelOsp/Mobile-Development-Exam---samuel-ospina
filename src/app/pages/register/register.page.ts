import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
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
    private readonly router: Router,
    private navCtrl: NavController,
  ) {
    this.initForm();
  }

  ngOnInit() {}

  public  async doRegister() {
    console.log(this.registerForm.value);
    let users = await this.storageSrv.get<IUser[]>(CONSTANTS.USER);
    if (!users) {
      users = [];
    }
    const exists = users.find((user) => user.email === this.email.value);
    if (exists) {
      alert('The email already exists'); 
      return;
    }

    const newUser: IUser = {
      uuid: v4(),
      name: this.name.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: this.password.value,
    };

    users.push(newUser);

    await this.storageSrv.set(CONSTANTS.USER, users);

    this.registerForm.reset();

    
    this.navCtrl.navigateRoot('/login');
  }

  goToLogin() {
    this.navCtrl.navigateRoot('/login');
  }

  private initForm() {
    this.name = new FormControl('', [Validators.required]);
    this.lastname = new FormControl('', [Validators.required]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.registerForm = new FormGroup({
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
    });
  }
}
