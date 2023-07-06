import { Component, OnInit } from '@angular/core';
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
  hasPermission = false;

  constructor(private userService: UserService, private authService: AuthService) {
    this.tokenData = authService.tokenData$;
  }

  ngOnInit(): void {
    this.checkPermission();
  }

  loadData(): void{
    this.userService.weather()
    .subscribe(weather => this.weather = weather)
  }

  checkPermission(): void {
    if(!this.tokenData.value) {return;}

    this.tokenData.value.permissions.includes(Permission.getQuiz) 
      ? this.hasPermission = true : this.hasPermission = false;
  }
  
}