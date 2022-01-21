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
    id: 0,
    question: '',
    answers: ''
  };

  answer: AnswersModel = {
    id: 0,
    answ: ''
  }

  quest$: BehaviorSubject<QuestionModel | null>;
  answers$!: BehaviorSubject<AnswersModel[]>;

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
      this.router.navigate(['/main/quizzes/game/points']);
    }
    
    this.number = id;
    this.service.getQuestionById(id).subscribe();
   
    const array = this.service.quest$.value?.answers.split(',');
    console.log(array);
    
    //debugger;

    const first = array![0];

    console.log(first);
    
    // for(let i = 0; i <= 3; i++)
    // {
    //   this.answer.answ = array![i];
    // } 
     
    id++;
    
    //this.service.getAnswers().subscribe();
  }

  answers(): void {
    
  }
}
