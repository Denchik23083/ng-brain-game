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

  quest: QuestionModel = {
    question: ''
  };

  answer: AnswersModel = {
    answers: ''
  }

  quest$: BehaviorSubject<QuestionModel | null>;
  answers$: BehaviorSubject<AnswersModel[]>;

  constructor(private service: BrainGameService, private router: Router) {
    this.quest$ = service.quest$;
    this.answers$ = service.answers$;
  }

  number: any;

  ngOnInit(): void {
    
  }

  load(): void {    
    if(id > 2)
    {
      id = 1;
    }
    this.service.getQuestionById(id).subscribe();    
    this.number = id;    
    id++;

    this.answers();
  }

  answers(): void {
    this.service.getAnswers().subscribe(); 
  }
}
