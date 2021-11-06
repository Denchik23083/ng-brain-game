import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface RegisterModel{
  id?: number,
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export interface LoginModel{
  id?: number,
  email: string,
  password: string,
}

@Injectable({
  providedIn: 'root'
})
export class BrainGameService {
  apiLink = 'https://localhost:5001/api';

  registered$ = new BehaviorSubject<RegisterModel[]>([]);
  logined$ = new BehaviorSubject<LoginModel[]>([]);

  constructor(private http: HttpClient) { }

  register(model: RegisterModel): Observable<RegisterModel>{
    return this.http.post<RegisterModel>(`${this.apiLink}/Register`, model)
      .pipe(
        tap(reg => this.registered$.next([...this.registered$.value, reg]))
      )
  }

  login(model: LoginModel): Observable<LoginModel>{
    return this.http.post<LoginModel>(`${this.apiLink}/Login`, model)
      .pipe(
        tap(log => this.logined$.next([...this.logined$.value, log]))
      )
  }
}
