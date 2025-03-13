import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('in interceptor');
 
  // const authService = inject();
  const token = sessionStorage.getItem('token')
  console.log(token);
  

  if (token) {
   const clonedRequest = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    console.log('Cloned request with token:', clonedRequest);
    return next(clonedRequest);
  }
  return next(req);
};
