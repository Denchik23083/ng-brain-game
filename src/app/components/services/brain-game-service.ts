import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface RegisterModel{
  id?: number,
  login: string,
  password: string,
  confirmPassword: string,
}

@Injectable({
  providedIn: 'root'
})
export class BrainGameService {
  apiLink = 'https://localhost:5001/api/BrainGame';
  registered$ = new BehaviorSubject<RegisterModel[]>([]);

  constructor(private http: HttpClient) { }

  register(model: RegisterModel): Observable<RegisterModel>{
    return this.http.post<RegisterModel>(this.apiLink, model)
      .pipe(
        tap(reg => this.registered$.next([...this.registered$.value, reg]))
      )
  }
}
