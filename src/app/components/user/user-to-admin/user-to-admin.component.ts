import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GodService } from 'src/app/services/users/god.service';
import { UserReadModel, UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-user-to-admin',
  templateUrl: './user-to-admin.component.html',
  styleUrls: ['./user-to-admin.component.scss']
})
export class UserToAdminComponent implements OnInit {

  users$: BehaviorSubject<UserReadModel[]>;

  constructor(private service: GodService, private userService: UserService) {
    this.users$ = userService.users$;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe();
  }

  userToAdmin(id: number): void{
    this.service.userToAdmin(id).subscribe();
  }

}
