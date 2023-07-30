import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService, TokenData } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  tokenData: BehaviorSubject<TokenData>;

  constructor(authService: AuthService, private router: Router) {
    this.tokenData = authService.tokenData$;
  }

  ngOnInit(): void {
    
  }

  quiz(): void{
    if(!this.tokenData.value) { 
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/quizzes']);
  }  
}