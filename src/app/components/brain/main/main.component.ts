import { Component, OnInit } from '@angular/core';
import { BrainGameService, QuizzesModel } from 'src/app/services/brain-game-service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  quizzes: QuizzesModel = {
    name: '',
    point: 0
  };

  quizzes$!: BehaviorSubject<QuizzesModel[]>;

  constructor(private service: BrainGameService, private router: Router, private game: GameComponent) { 
    this.quizzes$ = service.quizzes$;
  }

  ngOnInit(): void {
    
  }

  animal(): void {
    this.quizzes.name = 'Animals';
    this.service.quizzes(this.quizzes).subscribe(() => {
      this.router.navigate(['/main/game']);
    });
  }

  plants(): void {
    this.quizzes.name = 'Plants';
    this.service.quizzes(this.quizzes).subscribe(() => {
      this.router.navigate(['/main/game']);
    });
  }

  mushrooms(): void {
    this.quizzes.name = 'Mushrooms';
    this.service.quizzes(this.quizzes).subscribe(() => {
      this.router.navigate(['/main/game']);
    });
  }

}