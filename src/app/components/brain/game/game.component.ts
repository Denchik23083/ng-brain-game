import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BrainGameService, QuestionModel } from 'src/app/services/brain-game-service';
import { Router } from '@angular/router';

let id = 1;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  quest: QuestionModel = {
    question: '',
    answers: '',
  };

  quest$!: BehaviorSubject<QuestionModel[]>;

  constructor(private service: BrainGameService, private router: Router) {
    this.quest$ = service.quest$;
   }

  ngOnInit(): void {
    if(id > 2)
    {
      id = 1;
    }
    this.service.getQuestionById(id).subscribe();    
    
    id++;
  }

  
}
