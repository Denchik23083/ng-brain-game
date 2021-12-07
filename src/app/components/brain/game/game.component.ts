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
    id: 0,
    question: '',
  };

  quest$!: BehaviorSubject<QuestionModel[]>;

  constructor(private service: BrainGameService, private router: Router) {
    this.quest$ = service.quest$;
   }

  ngOnInit(): void {
  }

  load(): void{
    this.service.getQuestionById(id).subscribe();    
    id++;
    window.location.reload; 
  }
}
