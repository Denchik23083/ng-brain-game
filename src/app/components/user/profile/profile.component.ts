import { Component, OnInit } from '@angular/core';
import { UserService, UserModel } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  users$: BehaviorSubject<UserModel | null>;  

  constructor(private service: UserService, private router: Router) {
    this.users$ = service.users$;
  }

  ngOnInit(): void {
    this.service.get().subscribe();
  }
}