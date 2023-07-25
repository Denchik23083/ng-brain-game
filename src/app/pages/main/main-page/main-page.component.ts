import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService, TokenData } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  tokenData: BehaviorSubject<TokenData>;

  constructor(private authService: AuthService) {
    this.tokenData = authService.tokenData$;
  }

  ngOnInit(): void {
  }

}
