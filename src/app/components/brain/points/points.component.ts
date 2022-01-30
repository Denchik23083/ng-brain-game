import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BrainGameService, PointsModel } from 'src/app/services/brain-game-service';

@Component({
  selector: 'app-points',
  templateUrl: './points.component.html',
  styleUrls: ['./points.component.scss']
})
export class PointsComponent implements OnInit {

  pts: PointsModel = {
    name: '',
    point: 0,
  };

  points$: BehaviorSubject<PointsModel | null>

  constructor(private service: BrainGameService) {
    this.points$ = service.points$;
  }

  ngOnInit(): void {
    this.service.getPoints().subscribe();
  }

  result(): void {
    this.service.result().subscribe();
  } 

}
