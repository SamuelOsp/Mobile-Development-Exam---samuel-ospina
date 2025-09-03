import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { CONSTANTS } from 'src/app/constants/constants';
import { IUser } from 'src/app/interfaces/user.interface';
import { Storage } from 'src/app/shared/services/storage';
import { v4 } from 'uuid';
import { Security } from 'src/app/shared/services/security/security';
import { Toast } from 'src/app/shared/providers/toast/toast';

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
  public country!: FormControl;
  public registerForm!: FormGroup;

  constructor(
    private readonly storageSrv: Storage,
    private toastSrv:Toast,
    private navCtrl: NavController,
    private securitySrv: Security
  ) {
    this.initForm();
  }

  ngOnInit() {}

  public async doRegister() {
    let users = await this.storageSrv.get<IUser[]>(CONSTANTS.USER) || [];

    const exists = users.find((user) => user.email === this.email.value);

    if(this.email.value.trim() === ''){
      return;
    } 

    if (exists) {
      await this.toastSrv.viewToast('The email already exist', 3000, 'warning'); 
      return;
    }

  
    const hashedPassword = await this.securitySrv.hashPassword(this.password.value);

    const newUser: IUser = {
      uuid: v4(),
      name: this.name.value,
      lastname: this.lastname.value,
      email: this.email.value,
      password: hashedPassword,
      country: this.country.value
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
    this.country = new FormControl('', [Validators.required]);
    this.registerForm = new FormGroup({
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      country: this.country,
    });
  }
}
