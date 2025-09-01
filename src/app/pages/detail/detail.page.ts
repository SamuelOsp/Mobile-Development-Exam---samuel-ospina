import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.interface';
import { Storage } from 'src/app/shared/services/storage';
import { CONSTANTS } from 'src/app/constants/constants';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false
})
export class DetailPage implements OnInit, OnDestroy {
  public user: IUser | null = null;
  private sub!: Subscription;

  constructor(
    private readonly activateRouter: ActivatedRoute,
    private readonly storageSrv: Storage
  ) {}

  ngOnInit() {
    this.sub = this.activateRouter.params.subscribe(params => {
      const users = this.storageSrv.get<IUser[]>(CONSTANTS.USER) || [];
      this.user = users.find(u => u.uuid === params['uuid']) || null;
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
