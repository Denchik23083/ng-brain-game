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
