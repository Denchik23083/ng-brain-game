import { Component, OnInit } from '@angular/core';
import { StatisticsModel, StatisticsService } from 'src/app/services/quiz/statistics.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  statistics$: BehaviorSubject<StatisticsModel[]>;

  constructor(private service: StatisticsService) {
    this.statistics$ = service.statistics$;
  }

  ngOnInit(): void {
    this.service.getPoints().subscribe();
  }

  clear(): void {
    this.service.clearStatistics().subscribe(() => {
      this.ngOnInit();
    });
  }
}