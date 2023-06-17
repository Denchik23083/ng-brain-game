import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, TokenData } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user$: BehaviorSubject<TokenData>;  

  constructor(authService: AuthService) {
    this.user$ = authService.tokenData$;
  }

  ngOnInit(): void {
  }
}