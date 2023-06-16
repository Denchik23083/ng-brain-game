import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface TokenModel {
  jwtToken: string;
  refreshToken: string;
}

export interface TokenData {
  email: string;
  name: string;
  expires: Date;
  rawToken: string;
}

export interface RegisterModel{
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export interface LoginModel{
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiLink = 'https://localhost:5001/api';

  constructor(private http: HttpClient, private router: Router) { }

  register(model: RegisterModel){
    return this.http.post<RegisterModel>(`${this.apiLink}/register`, model)
      .pipe(tap(() => this.router.navigate(['/login'])));
  }

  login(model: LoginModel): Observable<LoginModel>{
    return this.http.post<LoginModel>(`${this.apiLink}/login`, model)
      .pipe(tap(() => this.router.navigate(['/main'])));
  }

  getTokenData(token: string): TokenData {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));

    return {
      name: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] as string,
      email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] as string,
      expires: new Date(payload.exp * 1000),
      rawToken: token
    };
  }
}
