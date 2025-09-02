import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Storage } from '../shared/services/storage';
import { CONSTANTS } from '../constants/constants';
import { IUser } from '../interfaces/user.interface';

export const authGuard: CanActivateFn = async (route, state) => {
  const storageSrv = inject(Storage);
  const router = inject(Router);

  const auth = await storageSrv.get<IUser>(CONSTANTS.AUTH); 

  if (!auth) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
