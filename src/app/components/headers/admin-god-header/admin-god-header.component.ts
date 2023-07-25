import { Component, OnInit } from '@angular/core';
import { AuthService, Permission } from 'src/app/services/auth/auth.service';
import { CheckPermission } from 'src/app/utils/check-permission';

@Component({
  selector: 'app-admin-god-header',
  templateUrl: './admin-god-header.component.html',
  styleUrls: ['./admin-god-header.component.scss']
})
export class AdminGodHeaderComponent extends CheckPermission implements OnInit {

  hasAdminPermission = false;
  hasGodPermission = false;

  adminPermission?: Permission[] = [Permission.getQuiz, Permission.editQuiz, Permission.removeUser];
  godPermission?: Permission[] = [Permission.getQuiz, Permission.editQuiz, Permission.removeUser, Permission.adminToUser, Permission.userToAdmin];

  constructor(authService: AuthService) {
    super(authService);
  }

  ngOnInit(): void {
    this.hasAdminPermission = super.checkPermission(this.adminPermission);
    this.hasGodPermission = super.checkPermission(this.godPermission);
  }
}
