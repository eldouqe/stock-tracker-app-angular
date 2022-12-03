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
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //const isFinnhubApi = request.url.includes(`${environment.apiUrlFinnhub}`);
    const add_token_finnhub = request.headers.has('add_token_finnhub');
    if (!add_token_finnhub) {
      return next.handle(request);
    }
    request = request.clone({
      params: (request.params ? request.params : new HttpParams()).set(
        'token',
        environment.tokenFinnhub
      ),
      headers: request.headers.delete('add_token_finnhub'),
    });
    return next.handle(request);
  }
}
