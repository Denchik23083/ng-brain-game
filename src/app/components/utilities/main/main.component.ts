import { Component, OnInit } from '@angular/core';
import { UserService, WeatherModel } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  weather: WeatherModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.weather()
    .subscribe(weather => {
      this.weather = weather;

      console.log(this.weather);
    })
  }
}