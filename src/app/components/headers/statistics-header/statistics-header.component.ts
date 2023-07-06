import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService, Permission, TokenData } from 'src/app/services/auth.service';

@Component({
  selector: 'app-statistics-header',
  templateUrl: './statistics-header.component.html',
  styleUrls: ['./statistics-header.component.scss']
})
export class StatisticsHeaderComponent implements OnInit {

  @Input()
  permissions?: Permission[];

  hasPermission = false;

  tokenData: BehaviorSubject<TokenData>;

  constructor(private authService: AuthService, private router: Router) {
    this.tokenData = authService.tokenData$;
  }

  ngOnInit(): void {
    this.hasPermission = this.checkPermission(this.permissions);
  }

  checkPermission(requiredRermissions?: Permission[]): boolean {   
    if(!this.tokenData.value) {
      return false; 
    }

    if(!requiredRermissions) {
      return true; 
    }

    for(const permission of requiredRermissions){
      const hasPermission = this.tokenData.value.permissions.includes(permission);
      if (!hasPermission) {
        return false;
      }
    }  
    
    return true;
  }

}
