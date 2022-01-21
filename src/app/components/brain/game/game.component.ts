import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BrainGameService, QuestionModel, AnswersModel } from 'src/app/services/brain-game-service';
import { Router } from '@angular/router';

let id = 1;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  quest$: BehaviorSubject<QuestionModel | null>;

  constructor(private service: BrainGameService, private router: Router) {
    this.quest$ = service.quest$; 
  }

  number: any;
  answers: any;
  iter = [1, 2, 3];

  ngOnInit(): void { }

  load(): void {    

    if(id > 2)
    {
      id = 1;
      this.router.navigate(['/main/quizzes/game/points']);
    }
    
    this.number = id;
    this.service.getQuestionById(id).subscribe(() => {      
      this.answers = this.service.quest$.value?.answers.split(',') as any;
      id++;
    });
  }

  foo(answer: string): void {
    console.log(answer);
  }
}
