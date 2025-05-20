// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }        from '@angular/router';
<<<<<<< Updated upstream
import { provideHttpClient }    from '@angular/common/http';
import { HTTP_INTERCEPTORS }     from '@angular/common/http';
import { AppComponent }          from './app/app.component';
import { routes }                from './app/app.routes';
=======
import {
  provideHttpClient,
  withInterceptorsFromDi,
  withFetch
} from '@angular/common/http';
import { HTTP_INTERCEPTORS }    from '@angular/common/http';

import { AppComponent }         from './app/app.component';
import { routes }               from './app/app.routes';
>>>>>>> Stashed changes
import { CredentialsInterceptor } from './app/interceptors/credentials.interceptor';

bootstrapApplication(AppComponent, {
  // IMPORTANTE: aquí es donde se registra TODO
  providers: [
<<<<<<< Updated upstream
    provideRouter(routes),      // tu router
    provideHttpClient(),        // <<< aquí registras HttpClient globalmente
=======
    // 1) tu enrutador
    provideRouter(routes),

    // 2) HttpClient + nuestros interceptores + soporte fetch
    provideHttpClient(
      withInterceptorsFromDi(),  // lee los HTTP_INTERCEPTORS de DI
      withFetch()                // habilita fetch() en SSR
    ),

    // 3) registro de tu interceptor concreto
>>>>>>> Stashed changes
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    }
  ]
<<<<<<< Updated upstream
}).catch(err => console.error(err));
=======
})
.catch(err => console.error(err));
>>>>>>> Stashed changes
