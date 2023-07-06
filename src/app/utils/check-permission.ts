import { BehaviorSubject } from "rxjs";
import { AuthService, Permission, TokenData } from "../services/auth.service";
import { Router } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class CheckPermission {
    tokenData: BehaviorSubject<TokenData>;
    
    constructor(private authService: AuthService, private router: Router) { 
        this.tokenData = authService.tokenData$;
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
