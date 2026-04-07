import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

export const logInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse) {
          console.log(`Respuesta HTTP: ${event.status} (${req.method} ${req.url})`);
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          console.error(`Respuesta HTTP: ${error.status} (${req.method} ${req.url})`);
        }
      }
    })
  );
};