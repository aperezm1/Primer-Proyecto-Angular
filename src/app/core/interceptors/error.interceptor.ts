import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../constants/app-routes.constant';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    tap({
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          switch (error.status) {
            case 401:
              console.error('No autorizado. Redirigiendo al login.');
              router.navigate([APP_ROUTES.login]);
              break;
            case 404:
              console.error('Recurso no encontrado (404).');
              break;
            case 500:
              console.error('Error interno del servidor (500).');
              break;
            default:
              console.error('Error en la petición: ' + error.status);
          }
        }
      }
    })
  );
};