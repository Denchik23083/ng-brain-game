import { Component, OnInit } from '@angular/core';
import { StatisticsModel, UserService } from 'src/app/services/user.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statistics$: BehaviorSubject<StatisticsModel[]>;

  constructor(private service: UserService) {
    this.statistics$ = service.statistics$;
  }

  ngOnInit(): void {
    this.service.getPoints().subscribe();
  }

  clear(): void {
    this.service.clear().subscribe(() => {
      this.ngOnInit();
    });
  }
}