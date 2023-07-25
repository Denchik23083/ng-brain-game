import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StatisticsService } from 'src/app/services/quiz/statistics.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  //points$: BehaviorSubject<PointsModel | null>

  constructor(private service: StatisticsService) {
    //this.points$ = service.points$;
  }

  ngOnInit(): void {
    this.service.getPoints().subscribe();
  }

  result(): void {
    //this.service.result().subscribe();
  } 
}