import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
  apiLink = 'https://localhost:5001/api';
  statisticsLink = 'https://localhost:6001/api/Statistics';

  statistics$ = new BehaviorSubject<StatisticsModel[]>([]);
  users$ = new BehaviorSubject<UserModel | null>(null);
  passwords$ = new BehaviorSubject<PasswordModel | null>(null);

  constructor(private http: HttpClient) { }

  get(): Observable<UserModel>{
    return this.http.get<UserModel>(`${this.apiLink}/User`)
      .pipe(
        tap(user => this.users$.next(user))
      );
  }

  edit(model: UserModel): Observable<UserModel>{
    return this.http.put<UserModel>(`${this.apiLink}/User`, model)
      .pipe(
        tap(created => this.users$.next(created))
      )
  }

  password(model: PasswordModel): Observable<PasswordModel>{
    return this.http.post<PasswordModel>(`${this.apiLink}/User`, model)
      .pipe(
        tap(created => this.passwords$.next(created))
      )
  }

  remove(): Observable<{}>{
    return this.http.delete(`${this.apiLink}/User`);
  }

  getPoints(): Observable<StatisticsModel[]>{
    return this.http.get<StatisticsModel[]>(this.statisticsLink)
      .pipe(
        tap(point => this.statistics$.next(point))
      );
  }

  clear(): Observable<{}>{
    return this.http.delete(this.statisticsLink);
  }
}
