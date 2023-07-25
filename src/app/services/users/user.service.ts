import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

export interface UserWriteModel{
  name: string,
  email: string,
}

export interface UserReadModel{
  id: number,
  name: string,
  email: string,
}

export interface PasswordModel{
  oldPassword: string,
  newPassword: string,
  confirmPassword: string,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiLink = 'https://localhost:7001/api/user';
  
  users$ = new BehaviorSubject<UserReadModel[]>([]);
    
  constructor(private http: HttpClient, 
    private router: Router,
    private authService: AuthService) { }

  getUsers(): Observable<UserReadModel[]>{
    return this.http.get<UserReadModel[]>(this.apiLink)
      .pipe(
        tap(users => this.users$.next(users))
      );
  }

  edit(model: UserWriteModel): Observable<UserWriteModel>{
    return this.http.put<UserWriteModel>(this.apiLink, model)
      .pipe(
        tap(() => { 
          this.clearData();
          this.router.navigate(['/']);
        })
      )
  }

  password(model: PasswordModel): Observable<PasswordModel>{
    return this.http.post<PasswordModel>(`${this.apiLink}/password`, model)
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
}
