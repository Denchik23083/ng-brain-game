import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface TokenModel {
  jwtToken: string,
  refreshToken: string,
}

export interface TokenData {
  name: string,
  email: string,
  permissions: string[],
  gender: string,
  expires: Date,
  rawToken: string,
}

export interface GenderModel {
  id: number,
  type: Gender
}

export enum Gender {
  male = 0,
  female = 1
}
export interface RegisterModel{
  name: string,
  email: string,
  genderId: number,
  password: string,
  confirmPassword: string,
}

export interface LoginModel{
  email: string,
  password: string,
}

export enum Permission {
  getQuiz = 'GetQuiz',
  editQuiz = 'EditQuiz',
  removeUser = 'RemoveUser',
  userToAdmin = 'UserToAdmin',
  adminToUser = 'AdminToUser',
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiLink = 'https://localhost:5001/api';
  tokenKey = 'jwtToken';
  refreshTokenKey = 'refreshToken';

  tokenData$ = new BehaviorSubject<TokenData>(null as any);
  refreshToken$ = new BehaviorSubject<string>(null as any);

  gender$ = new BehaviorSubject<GenderModel[]>([]);

  constructor(private http: HttpClient, private router: Router) {
    const rawToken = localStorage.getItem(this.tokenKey);
    if (rawToken) {
        const tokenData = this.getTokenData(rawToken);
        this.tokenData$.next(tokenData);
      }

    const refreshToken = localStorage.getItem(this.refreshTokenKey);
      if (refreshToken) {
        this.refreshToken$.next(refreshToken);
      }      
    }

  getGenders(): Observable<GenderModel[]> {
    return this.http.get<GenderModel[]>(`${this.apiLink}/register/gender`)
      .pipe(
        tap(gender => this.gender$.next(gender))
      )
  }

  register(model: RegisterModel){
    return this.http.post<RegisterModel>(`${this.apiLink}/register`, model)
      .pipe(tap(() => this.router.navigate(['/login'])));
  }

  login(model: LoginModel): Observable<TokenData>{
    return this.http.post<TokenModel>(`${this.apiLink}/login`, model)
      .pipe(
        tap(model => {
          this.refreshToken$.next(model.refreshToken);
          this.tokenData$.next(this.getTokenData(model.jwtToken));
          localStorage.setItem(this.tokenKey, model.jwtToken);
          localStorage.setItem(this.refreshTokenKey, model.refreshToken);
        }),
        map(model => this.getTokenData(model.jwtToken)),
        tap(() => this.router.navigate(['/'])));
  }

  refresh(): Observable<TokenData>{
    return this.http.post<TokenModel>(`${this.apiLink}/login/refresh`, 
      { value: this.refreshToken$.value })
      .pipe(
        tap(model => {
          this.refreshToken$.next(model.refreshToken);
          this.tokenData$.next(this.getTokenData(model.jwtToken));
          localStorage.setItem(this.tokenKey, model.jwtToken);
          localStorage.setItem(this.refreshTokenKey, model.refreshToken);
        }),
        map(model => this.getTokenData(model.jwtToken))
      );
  }

  getTokenData(token: string): TokenData {
    const payloadBase64 = token.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));

    const permissions = Array.isArray(payload.permission) ? payload.permission : [payload.permission];

    return {
      name: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] as string,
      email: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] as string,
      permissions: permissions as string[],
      gender: payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/gender'] as string,
      expires: new Date(payload.exp * 1000),
      rawToken: token
    };
  }
}
