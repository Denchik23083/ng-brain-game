import { Injectable } from '@angular/core';
import { AdminService } from './admin.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GodService {
  apiLink = 'https://localhost:7001/api/god';

  constructor(private http: HttpClient,
    private adminService: AdminService, 
    private userService: UserService) { }

  userToAdmin(id: number): Observable<{}> {
    const updateUser = this.userService.users$.value.filter(b => b.id !== id);

    return this.http.put<{}>(`${this.apiLink}/usertoadmin/id?id=${id}`, null)
      .pipe(
        tap(() => this.userService.users$.next(updateUser))
      );
  }
  
  adminToUser(id: number): Observable<{}> {
    const updateAdmin = this.adminService.admins$.value.filter(b => b.id !== id);

    return this.http.put<{}>(`${this.apiLink}/admintouser/id?id=${id}`, null)
      .pipe(
        tap(() => this.adminService.admins$.next(updateAdmin))
      );
  }
}
