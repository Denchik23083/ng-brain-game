import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, empty } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(this.authService.apiLink))
    {
      return next.handle(request);
    }

    if (!this.authService.tokenData$.value) {
      this.router.navigate(['/login']);
      
      return empty();
    }
    
    const cloned = request.clone({
      headers: new HttpHeaders({
      'Authorization': `Bearer ${this.authService.tokenData$.value.rawToken}`
      })
    });
    
    return next.handle(cloned);
  }
}
