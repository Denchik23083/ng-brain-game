import { Component, Input, OnInit } from '@angular/core';
import { AuthService, Permission } from 'src/app/services/auth/auth.service';
import { CheckPermission } from 'src/app/utils/check-permission';

@Component({
  selector: 'app-admin-god-header',
  templateUrl: './admin-god-header.component.html',
  styleUrls: ['./admin-god-header.component.scss']
})
export class AdminGodHeaderComponent extends CheckPermission implements OnInit {
  @Input()
  adminPermission?: Permission[];
  
  @Input()
  godPermission?: Permission[];  

  hasAdminPermission = false;
  hasGodPermission = false;

  constructor(authService: AuthService) {
    super(authService);
  }

  ngOnInit(): void {
    this.hasAdminPermission = super.checkPermission(this.adminPermission);
    this.hasGodPermission = super.checkPermission(this.godPermission);
  }
}
