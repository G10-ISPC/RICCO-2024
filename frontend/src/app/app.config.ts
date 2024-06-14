import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { injectToken } from './interceptors/auth-interceptor';
import { HttpErrorInterceptor } from './interceptors/errors-interceptor';
import { LogService } from './services/log.service';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([injectToken])),
    {
      provide:HTTP_INTERCEPTORS, useClass:HttpErrorInterceptor, multi: true,deps:[LogService]
    }
  ]

};
