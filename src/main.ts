// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter }       from '@angular/router';

import { AppComponent }        from './app/app.component';
import { routes }              from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)
    // ya no pones aquí ni provideHttpClient ni interceptores
  ]
}).catch(err => console.error(err));
