import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrainGameService } from 'src/app/services/brain-game-service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(private service: BrainGameService, private router: Router) { }

  ngOnInit(): void {
  }

  remove() : void {
    this.service.removePoints().subscribe();
    this.router.navigate(['/main/quizzes/new/game']);
  }
}
