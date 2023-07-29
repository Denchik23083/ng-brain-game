import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from 'src/app/services/users/admin.service';
import { UserReadModel, UserService, UserWriteModel } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-remove-user',
  templateUrl: './remove-user.component.html',
  styleUrls: ['./remove-user.component.scss']
})
export class RemoveUserComponent implements OnInit {

  user: UserWriteModel = {
    name: '',
    email: '',
  };

  users$: BehaviorSubject<UserReadModel[]>;

  constructor(private service: AdminService, private userService: UserService) {
    this.users$ = userService.users$;
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe();
  }

  removeUser(id: number): void{
    this.service.removeUser(id).subscribe();
  }
}
