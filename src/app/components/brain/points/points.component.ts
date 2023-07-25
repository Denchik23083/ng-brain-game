import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StatisticsModel, StatisticsService } from 'src/app/services/quiz/statistics.service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  points$: BehaviorSubject<StatisticsModel>

  id!: number;

  constructor(private service: StatisticsService, private activatedRoute: ActivatedRoute) {
    this.points$ = service.points$;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as any;
    this.service.getPoints(this.id).subscribe();
  }
}