import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { environment } from '../../environments/environment';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  
  constructor(private loaderService: LoaderService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clonar la solicitud para agregar el encabezado
    const modifiedReq = req.clone({
      setHeaders: {
        'x-authorization': environment.api_key // Agrega tu encabezado y valor aquí
      }
    });

    this.loaderService.showLoader();
    return next.handle(modifiedReq).pipe(
      finalize(() => this.loaderService.hideLoader())
    );
  }
}