import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  apiLink = 'https://localhost:7001/api/admin';
  
  constructor(private http: HttpClient, 
    private userService: UserService) { }

  removeUser(id: number): Observable<{}> {
    const removeUser = this.userService.users$.value.filter(b => b.id !== id);
    return this.http.delete<{}>(`${this.apiLink}/id?id=${id}`)
      .pipe(
        tap(() => this.userService.users$.next(removeUser))
      );
  }
}
