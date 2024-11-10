import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('pet-clinic-user');
  const PUBLIC_ENDPOINTS = ['/auth/login', '/auth/signup'];
  const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint => req.url.includes(endpoint));

  if(isPublicEndpoint) return next(req);
  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  return next(cloneReq);
};
