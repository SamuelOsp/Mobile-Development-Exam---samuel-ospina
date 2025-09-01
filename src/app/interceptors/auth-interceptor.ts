import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: {
      'X-Api-Key': environment.API_KEY
    }
  });
  return next(cloned);
};
