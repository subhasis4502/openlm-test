import { Injectable } from '@angular/core';
import { SpinnerOverlayService } from '@openlm/openlm-common';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerOverlayService) {}

  private count: number = 0;

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let disableLoader = false;

    req = req.clone({});

    if (req.headers.has('disable-loader')) {
      disableLoader = true;
      const headers = req.headers.delete('disable-loader');
      req = req.clone({ headers });
    }

    if (!disableLoader) {
      this.spinnerService.show();
    }

    this.count++;

    return next.handle(req).pipe(
      finalize(() => {
        this.count--;

        if (this.count === 0) {
          this.spinnerService.hide();
        }
      })
    );
  }
}
