import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService, Permission, TokenData } from 'src/app/services/auth.service';
import { UserService, WeatherModel } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
   
  weather: WeatherModel[] = [];  
  tokenData: BehaviorSubject<TokenData>;

  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.tokenData = authService.tokenData$;
  }

  ngOnInit(): void {
    
  }

  loadData(): void{
    this.userService.weather()
    .subscribe(weather => this.weather = weather)
  }

  quiz(): void{
    if(!this.tokenData.value) { 
      this.router.navigate(['/login']);
      return;
    }

    this.router.navigate(['/quizzes']);
  }  
}