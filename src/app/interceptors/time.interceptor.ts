import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContext,
  HttpContextToken,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';//this module allows us to manipulate the intercepted
                                     //response without having to modify it.
/*
A context for an interceptor is used to determine when and when not an interceptor
has to be used.
*/
const CHECK_TIME = new HttpContextToken<boolean>(() => false );

export function checkTime(){
  return new HttpContext().set(CHECK_TIME, true);
}
/*Interceptors have to be injected differently, unlike other injectables such as services, 
directives, and so on. So, down below is the tiny guide step-by-step to inject it.

* First of all, we have to import { HTTP_INTERCEPTORS } from '@angular/common/http' in our app.module;
* Second of, It is necessary to add to providers in app.module the next line: 
{ provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true }
*/
@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.context.get(CHECK_TIME)) {
      const start = performance.now();
      return next
      .handle(request)
      .pipe(
        tap(() => {
          const time = (performance.now() - start) + 'ms';
          console.log(request.url, time);
        })
      );
    }
    return next.handle(request);
  }
}
