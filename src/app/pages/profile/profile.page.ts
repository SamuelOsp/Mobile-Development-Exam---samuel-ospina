import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/shared/services/storage';
import { IUser } from 'src/app/interfaces/user.interface';
import { CONSTANTS } from 'src/app/constants/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  user: IUser | null = null;
  private sub!: Subscription;

  constructor(private storage: Storage, private readonly activateRouter: ActivatedRoute, private readonly router: Router,) {}

 ngOnInit() {
    this.sub = this.activateRouter.params.subscribe(params => {
      const users = this.storage.get<IUser[]>(CONSTANTS.USER) || [];
      this.user = users.find(u => u.uuid === params['uuid']) || null;
    });
  }
goToHome() {
  this.router.navigateByUrl('/home', { replaceUrl: true }); 
}




}