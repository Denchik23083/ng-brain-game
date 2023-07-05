import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, TokenData } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: BehaviorSubject<TokenData>;  

  constructor(private authService: AuthService, private userService: UserService) {
    this.user$ = authService.tokenData$;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.userService.logout();
  }
}