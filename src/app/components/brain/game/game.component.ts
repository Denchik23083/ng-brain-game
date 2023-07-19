import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BrainGameService, QuestionModel, CorrectsModel } from 'src/app/services/brain-game-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  questions$!: BehaviorSubject<QuestionModel[]>;
  quest: QuestionModel | undefined;

  correct: CorrectsModel = {
    questionId: 0,
    correctAnswer: ''
  };

  constructor(private service: BrainGameService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.questions$ = service.questions$;
  }

  number: any = 1;
  answers: any;
  iter = [1, 2, 3];

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions(): void{
    const id = this.activatedRoute.snapshot.paramMap.get('id') as any
    this.service.getQuestions(id).subscribe(model => {
      if(this.number > model.length)
      {      
        this.number = 1;
        this.router.navigate([`/`]);
      }

      this.quest = model.find(b => b.number == this.number);
      this.answers = this.quest?.answers.split(',') as any;
    });
  }

  foo(answer: string): void {
    this.correct = { questionId: this.quest?.id, correctAnswer: answer}
    
    this.service.corrects(this.correct).subscribe(() => {
      this.number++;
      this.getQuestions();
    });
  }
}