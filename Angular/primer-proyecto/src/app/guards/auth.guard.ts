import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const isLoggedIn = localStorage.getItem('token') !== null;
  
  if (isLoggedIn) {
    return true;
  }

  const router = inject(Router);
  return router.createUrlTree(['/login']);
};