// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';
import {  provideHttpClient,  withInterceptorsFromDi, withFetch} from '@angular/common/http';
import { HTTP_INTERCEPTORS }    from '@angular/common/http';

import { AppComponent }          from './app/app.component';
import { routes }                from './app/app.routes';
import { CredentialsInterceptor } from './app/interceptors/credentials.interceptor';
import { CookieService } from 'ngx-cookie-service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    // registra HttpClient (y lee los interceptores que se hayan
    // proporcionado vía HTTP_INTERCEPTORS)
    provideHttpClient(withFetch()),

    // tu interceptor para añadir credenciales/session cookies
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    },
    CookieService
  ]
})
.catch(err => console.error(err));
