import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface UserModel{
  id?: number,
  name: string,
  email: string,
  password: string,
}

export interface StatisticsModel{
  name: string,
  point: number,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiLink = 'https://localhost:5001/api';
  statisticsLink = 'https://localhost:6001/api/Quiz';

  user$ = new BehaviorSubject<UserModel[]>([]);
  statistics$ = new BehaviorSubject<StatisticsModel[]>([]);

  constructor(private http: HttpClient) { }

  get(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.apiLink}/User`)
      .pipe(
        tap(user => this.user$.next(user))
      );
  }

  getPoints(): Observable<StatisticsModel[]>{
    return this.http.get<StatisticsModel[]>(this.statisticsLink)
      .pipe(
        tap(books => this.statistics$.next(books))
      );
  }
}
