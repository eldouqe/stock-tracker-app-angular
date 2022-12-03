import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class FinnhubInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const add_token_finnhub = request.headers.has('add_token_finnhub');
    if (!add_token_finnhub) {
      return next.handle(request);
    }
    request = request.clone({
      params: (request.params ? request.params : new HttpParams()).set(
        'token',
        environment.tokenFinnhub
      ),
    });
    return next.handle(request);
  }
}
