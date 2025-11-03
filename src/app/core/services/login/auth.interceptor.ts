import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth-service';
import { IResponseData } from '../../interfaces/IResponseData';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    console.log('INTERCEPTOR CALLED', token);

    const clonedReq = token
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        })
      : req;

    return next.handle(clonedReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const body = event.body as IResponseData;

          if (body?.exito && body?.accessToken) {
            this.authService.setToken(body.accessToken, body.expireIn);
            console.log('Token actualizado desde respuesta:', body.accessToken);
          }
        }
      })
    );
  }
}
