<<<<<<< Updated upstream
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
=======
// src/app/interceptors/credentials.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent
>>>>>>> Stashed changes
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
<<<<<<< Updated upstream
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Clonamos la petición y le añadimos withCredentials
    const cloned = req.clone({ withCredentials: true });
    return next.handle(cloned);
=======
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({ withCredentials: true }));
>>>>>>> Stashed changes
  }
}
