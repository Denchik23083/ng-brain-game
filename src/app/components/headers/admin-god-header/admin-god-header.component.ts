import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/services/auth.service';
import { CheckPermission } from 'src/app/utils/check-permission';

@Component({
  selector: 'app-admin-god-header',
  templateUrl: './admin-god-header.component.html',
  styleUrls: ['./admin-god-header.component.scss']
})
export class AdminGodHeaderComponent implements OnInit {

  hasAdminPermission = false;
  hasGodPermission = false;

  adminPermission?: Permission[] = [Permission.getQuiz, Permission.editQuiz, Permission.removeUser];
  godPermission?: Permission[] = [Permission.getQuiz, Permission.editQuiz, Permission.removeUser, Permission.adminToUser, Permission.userToAdmin];

  constructor(private checkPermission: CheckPermission) { }

  ngOnInit(): void {
    this.hasAdminPermission = this.checkPermission.checkPermission(this.adminPermission);
    this.hasGodPermission = this.checkPermission.checkPermission(this.godPermission);
  }

}
