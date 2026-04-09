import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  
  const token = authService.getToken();
  const headers: Record<string, string> = {};

  if (token) {
    headers['Authorization'] = token;
  }

  if (req.url.includes('/admin')) {
    headers['X-Admin'] = 'true';
  }

  if (Object.keys(headers).length === 0) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: headers
  });

  return next(authReq);
};