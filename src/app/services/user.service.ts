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

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiLink = 'https://localhost:5001/api';
  user$ = new BehaviorSubject<UserModel[]>([]);

  constructor(private http: HttpClient) { }

  get(): Observable<UserModel[]>{
    return this.http.get<UserModel[]>(`${this.apiLink}/User`)
      .pipe(
        tap(user => this.user$.next(user))
      );
  }
}
