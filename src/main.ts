// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';
import { provideHttpClient }    from '@angular/common/http';
import { HTTP_INTERCEPTORS }     from '@angular/common/http';
import { AppComponent }          from './app/app.component';
import { routes }                from './app/app.routes';
import { CredentialsInterceptor } from './app/interceptors/credentials.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),      // tu router
    provideHttpClient(),        // <<< aquí registras HttpClient globalmente
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    }
  ]
}).catch(err => console.error(err));
