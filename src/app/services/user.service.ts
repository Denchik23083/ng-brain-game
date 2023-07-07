import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

export interface WeatherModel{
  date: Date,
  temperatureC: number,
  summary: string
}

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
  weather$ = new BehaviorSubject<WeatherModel[]>([]);
  
  constructor(private http: HttpClient, 
    private router: Router,
    private authService: AuthService) { }

  weather(): Observable<WeatherModel[]>{
    return this.http.get<WeatherModel[]>(`${this.apiLink}/weather`)
      .pipe(
        tap(weather => this.weather$.next(weather))
      )
  }

  edit(model: UserModel): Observable<UserModel>{
    return this.http.put<UserModel>(`${this.apiLink}/user`, model)
      .pipe(
        tap(() => { 
          this.clearData();
          this.router.navigate(['/']);
        })
      )
  }

  password(model: PasswordModel): Observable<PasswordModel>{
    return this.http.post<PasswordModel>(`${this.apiLink}/user/password`, model)
      .pipe(
        tap(() => { 
          this.clearData();
          this.router.navigate(['/']);
        })
      )
  }  

  logout(): void {
    this.clearData();
    this.router.navigate(['/']);
  }

  clearData(): void {
    localStorage.clear();
    this.authService.tokenData$.next(null as any);
    this.authService.refreshToken$.next(null as any);
  }

  /*remove(): Observable<{}>{
    return this.http.delete(`${this.apiLink}/user`)
      .pipe(
        tap(() => localStorage.removeItem(this.authService.tokenKey)),
        tap(() => this.router.navigate(['/']))
      );
  }*/

  getPoints(): Observable<StatisticsModel[]>{
    return this.http.get<StatisticsModel[]>(`${this.apiLink}/statistics`)
      .pipe(
        tap(point => this.statistics$.next(point))
      );
  }

  clearStatistics(): Observable<{}>{
    return this.http.delete(`${this.apiLink}/statistics`);
  } 
}
