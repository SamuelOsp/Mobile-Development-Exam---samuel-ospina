import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/shared/services/storage';
import { IUser } from 'src/app/interfaces/user.interface';
import { CONSTANTS } from 'src/app/constants/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Security } from 'src/app/shared/services/security/security';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  user: IUser | null = null;
  private sub!: Subscription;
  profileForm!: FormGroup;

  constructor(
    private storage: Storage,
    private readonly activateRouter: ActivatedRoute,
    private readonly router: Router,
    private fb: FormBuilder,
    private security: Security
  ) {}

  ngOnInit() {
    const uuid = this.activateRouter.snapshot.paramMap.get('uuid');
    const users = this.storage.get<IUser[]>(CONSTANTS.USER) || [];
    this.user = users.find((u) => u.uuid === uuid) || null;

    this.profileForm = this.fb.group({
      uuid: [this.user?.uuid],
      name: [this.user?.name, Validators.required],
      lastname: [this.user?.lastname, Validators.required],
      email: [this.user?.email, [Validators.required, Validators.email]],
      country: [this.user?.country, [Validators.required]],
      password: [''],
    });
  }
  async saveChanges(updatedUser: IUser) {
  if (updatedUser && this.user) {
    const users = this.storage.get<IUser[]>(CONSTANTS.USER) || [];
    const index = users.findIndex((u) => u.uuid === updatedUser.uuid);

    if (index > -1) {
      const passwordControl = this.profileForm.get('password');
      if (passwordControl?.dirty && updatedUser.password.trim() !== '') {
        updatedUser.password = await this.security.hashPassword(updatedUser.password);
      } else {
      
        updatedUser.password = users[index].password;
      }

      users[index] = updatedUser;
      this.storage.set(CONSTANTS.USER, users);
    }

    this.router.navigateByUrl('/home', { replaceUrl: true });
  }
}


onSubmit() {
  if (this.profileForm.valid) {
    const updatedUser: IUser = this.profileForm.value;
    this.saveChanges(updatedUser);
  }
}



  goToHome() {
    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  goToEdit() {
    if (this.user) {
      this.router.navigate(['/edit-profile', this.user.uuid]);
    }
  }




}
