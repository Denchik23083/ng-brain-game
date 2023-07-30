import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, TokenData } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: BehaviorSubject<TokenData>;  

  constructor(authService: AuthService, private userService: UserService) {
    this.user$ = authService.tokenData$;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }
}