import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { UserReadModel, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.scss']
})
export class RemoveUserComponent implements OnInit {

  users$: BehaviorSubject<UserReadModel[]>;

  constructor(private service: UserService, private adminService: AdminService) {
    this.users$ = service.users$;
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe();
  }

  removeUser(id: number): void{
    this.adminService.removeUser(id).subscribe();
  }

}
