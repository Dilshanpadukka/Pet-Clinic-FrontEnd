import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('pet-clinic-userToken');
  const PUBLIC_ENDPOINTS = ['/auth/login', '/auth/signup'];
  const isPublicEndpoint = PUBLIC_ENDPOINTS.some(endpoint => req.url.includes(endpoint));

  // If endpoint is public, skip adding the token
  if (isPublicEndpoint) return next(req);

  // If token is missing, throw an error or redirect to login
  if (!token) {
    console.error("No token found! Authorization required.");
    // Handle unauthorized access (e.g., redirect to login)
    return next(req); // or throw an error, depending on your app's requirements
  }

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
  return next(cloneReq);
};
