import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const tokenData = this.authService.tokenData$.value;
       
    if(!tokenData){
      this.router.navigate(['/']);
      return false;
    }

    const requiredRermissions = route.data.permissions;

    for(const permission of requiredRermissions){
      const hasPermission = tokenData.permissions.includes(permission);
      if (!hasPermission) {
        this.router.navigate(['/']);
        return false;
      }
    }
    
    return true;
  }
  
}
