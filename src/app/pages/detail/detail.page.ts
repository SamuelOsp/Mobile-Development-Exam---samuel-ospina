import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'src/app/interfaces/user.interface';
import { Storage } from 'src/app/shared/services/storage';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: false
})
export class DetailPage implements OnInit {
  public user!: IUser;
  constructor(private readonly activateRouter: ActivatedRoute, private readonly storageSrv: Storage) { }

  ngOnInit() {
    this.activateRouter.params.subscribe((params)=>{
      console.log(params);
      const users = this.storageSrv.get<IUser[]>("users") || [];
      const user = users.find(u => u.uuid == params['uuid']);
      if(user) {
         this.user = user;
         console.log(user)
      }
     
    });
  
  }

}
