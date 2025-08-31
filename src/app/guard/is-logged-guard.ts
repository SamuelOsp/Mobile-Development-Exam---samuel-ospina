import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '../shared/services/storage';
import { CONSTANTS } from '../constants/constants';
import { IUser } from '../interfaces/user.interface';

export const isLoggedGuard: CanActivateFn = (route, state) => {
  const storageSrv = inject(Storage);
  const router = inject(Router);
  console.log(typeof router.url);
  const auth = storageSrv.get<IUser>(CONSTANTS.AUTH);

  if(auth){
    router.navigate(['/home']);
    return false;
  }
  
  return true;
};
