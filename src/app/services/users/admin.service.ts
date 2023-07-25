import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';

export interface AdminWriteModel{
  name: string,
  email: string,
}

export interface AdminReadModel{
  id: number,
  name: string,
  email: string,
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiLink = 'https://localhost:7001/api/admin';

  admins$ = new BehaviorSubject<AdminReadModel[]>([]);
  
  constructor(private http: HttpClient, 
    private userService: UserService) { }

  getAdmins(): Observable<AdminReadModel[]>{
    return this.http.get<AdminReadModel[]>(this.apiLink)
      .pipe(
        tap(admins => this.admins$.next(admins))
      );
  }

  removeUser(id: number): Observable<{}> {
    const removeUser = this.userService.users$.value.filter(b => b.id !== id);
    
    return this.http.delete<{}>(`${this.apiLink}/id?id=${id}`)
      .pipe(
        tap(() => this.userService.users$.next(removeUser))
      );
  }
}
