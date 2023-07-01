import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, empty, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(this.authService.apiLink))
    {
      return next.handle(request);
    }

    if (!this.authService.tokenData$.value || !this.authService.refreshToken$.value) {
      this.router.navigate(['/login']);
      
      return empty();
    }
    
    const isTokenExpired = this.authService.tokenData$.value.expires <= new Date();
    
    if (isTokenExpired) {
      return this.authService.refresh()
        .pipe(
          mergeMap(tokenData => {
            const cloned = request.clone({
              headers: new HttpHeaders({
              'Authorization': `Bearer ${tokenData.rawToken}`
              })
            });

            return next.handle(cloned);
          })
        );
    }
    
    return next.handle(request);
  }
}
