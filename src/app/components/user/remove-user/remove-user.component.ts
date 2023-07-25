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

  /*filter(ngForm: NgForm): void{
    //this.userService.getUsers().subscribe();

    var email = ngForm.value.email;

    const updatedArr = this.users$.value.filter(b => b.email.startsWith(`${email}`));

    console.log(updatedArr);

    this.users$.next(updatedArr);
  }*/

}
