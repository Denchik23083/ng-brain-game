import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BrainGameService, QuestionModel, CorrectsModel } from 'src/app/services/brain-game-service';
import { Router } from '@angular/router';
import { NewComponent } from '../new/new.component';

let id = 1;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  quest$: BehaviorSubject<QuestionModel | null>;

  correct: CorrectsModel = {
    id: 0,
    correctAnswer: ''
  };

  constructor(private service: BrainGameService, private router: Router, public count: NewComponent) {
    this.quest$ = service.quest$; 
  }

  number: any;
  answers: any;
  iter = [1, 2, 3];

  ngOnInit(): void {
    if(id > 2)
    {
      this.router.navigate(['/main/quizzes/new/game/points']);
      id = 1;
    }
    this.number = id;
    this.service.getQuestionById(id).subscribe(() => {      
      this.answers = this.service.quest$.value?.answers.split(',') as any;
    });
  }

  foo(answer: string): void {
    this.correct.correctAnswer = answer;
    
    this.service.corrects(this.correct).subscribe(() => {
      id++;
      this.ngOnInit();
    });
  }
}
