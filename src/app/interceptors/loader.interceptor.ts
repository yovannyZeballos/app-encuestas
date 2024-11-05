import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService, private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtener el token de autorización
    const authToken = this.authService.getToken();

    // Clonar la solicitud para agregar el encabezado
    const modifiedReq = req.clone({
      setHeaders: {
        'x-authorization': environment.api_key,
        'Authorization': authToken ? `Bearer ${authToken}` : '' 
      }
    });

    this.loaderService.showLoader();
    return next.handle(modifiedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Redirigir al usuario a la página de inicio de sesión
          this.router.navigate(['/auth']);
          // Opcionalmente, puedes limpiar el token
          this.authService.clearToken();
        }
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader())
    );
  }
}