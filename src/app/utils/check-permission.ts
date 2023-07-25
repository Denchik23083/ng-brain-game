import { BehaviorSubject } from "rxjs";
import { AuthService, Permission, TokenData } from "../services/auth/auth.service";

export class CheckPermission {
    tokenData: BehaviorSubject<TokenData>;
    
    constructor(private authService: AuthService) { 
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
