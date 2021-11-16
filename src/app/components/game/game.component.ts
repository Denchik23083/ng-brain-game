import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BrainGameService, QuestionModel } from 'src/app/services/brain-game-service';
import { Router } from '@angular/router';

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

  id!: 1;

  quest$!: BehaviorSubject<QuestionModel[]>;

  constructor(private service: BrainGameService, private router: Router) {
    this.quest$ = service.quest$;
   }

  ngOnInit(): void {
    // this.id++;
    // this.service.getQuestionById(this.id);
  }

  load(): void{
    console.log("Hallo");
    
    this.service.getQuestionById(this.id);
    console.log("Foo");
  }

}
