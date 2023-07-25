import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminReadModel, AdminService } from 'src/app/services/users/admin.service';
import { GodService } from 'src/app/services/users/god.service';

@Component({
  selector: 'app-admin-to-user',
  templateUrl: './admin-to-user.component.html',
  styleUrls: ['./admin-to-user.component.scss']
})
export class AdminToUserComponent implements OnInit {

  admins$: BehaviorSubject<AdminReadModel[]>;

  constructor(private service: GodService, private adminService: AdminService) {
    this.admins$ = adminService.admins$;
  }

  ngOnInit(): void {
    this.adminService.getAdmins().subscribe();
  }

  adminToUser(id: number): void{
    this.service.adminToUser(id).subscribe();
  }
}
