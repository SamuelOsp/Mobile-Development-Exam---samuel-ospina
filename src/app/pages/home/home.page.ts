import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/IUser';
import { IUserr } from 'src/app/interfaces/user.interface';
import { Storage } from 'src/app/shared/services/storage';
import { UserService } from 'src/app/shared/services/user-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage  {
 public users: IUserr[] = [];
 public email!: FormControl;
 public password!: FormControl;
 public loginForm!: FormGroup;

  constructor(private readonly storageSrv: Storage, 
    private readonly router: Router, 
    private userSrv: UserService) {
      this.initForm();
      const users: IUserr[] = [
        {
          name: "pepe",
          lastname: "gonzalez",
          email: "pepe@gmail.com",
          password: "1234567890"
        },

        {
          name: "maria",
          lastName: "perez",
          email: "maria@gmail.com",
          password: "1234567890"
        },

        {
          name: "andres",
          lastName: "gonzalez",
          email: "andres@gmail.com",
          password: "1234567890"
        },
      ];
       users.forEach(u=> this.userSrv.signUp(u));

     }

     public doLogin(){
      this.userSrv.login({
        email: this.email.value,
        password: this.password.value
      });
      this.router.navigate(['/home2']);
     }
 
    public goToDetail(id: IUserr['uuid']){
      this.router.navigate(["/detail", id]);
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
