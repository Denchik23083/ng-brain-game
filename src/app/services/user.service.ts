import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface UserModel{
  name: string,
  email: string,
}

export interface PasswordModel{
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
}

export interface StatisticsModel{
  id: number,
  name: string,
  point: number,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiLink = 'https://localhost:6001/api';

  statistics$ = new BehaviorSubject<StatisticsModel[]>([]);

  constructor(private http: HttpClient, private router: Router) { }

  edit(model: UserModel): Observable<UserModel>{
    return this.http.put<UserModel>(`${this.apiLink}/user`, model)
      .pipe(
        tap(() => localStorage.clear()),
        tap(() => this.router.navigate(['/']))
      )
  }

  password(model: PasswordModel): Observable<PasswordModel>{
    return this.http.post<PasswordModel>(`${this.apiLink}/user/password`, model)
      .pipe(
        tap(() => localStorage.clear()),
        tap(() => this.router.navigate(['/']))
      )
  }

  remove(): Observable<{}>{
    return this.http.delete(`${this.apiLink}/user`)
      .pipe(
        tap(() => localStorage.clear()),
        tap(() => this.router.navigate(['/']))
      );
  }

  getPoints(): Observable<StatisticsModel[]>{
    return this.http.get<StatisticsModel[]>(`${this.apiLink}/statistics`)
      .pipe(
        tap(point => this.statistics$.next(point))
      );
  }

  clear(): Observable<{}>{
    return this.http.delete(`${this.apiLink}/statistics`);
  }
}
