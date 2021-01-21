import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { ProgressBarService } from '@shared/progress-bar.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private progressBarService: ProgressBarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.progressBarService.isLoading = true;
    const API_TOKEN = '484ac54f-e25a-4a8d-ade8-ce425d796fbd';

    return next
      .handle(request.clone({ setHeaders: { 'api-token': API_TOKEN } }))
      .pipe(
        filter((event) => event instanceof HttpResponse),
        tap((ev) => (this.progressBarService.isLoading = false))
      );
  }
}
