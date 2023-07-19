import { Component, OnInit } from '@angular/core';
import { BrainGameService, QuestionModel, CorrectsModel } from 'src/app/services/brain-game-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {

  question: QuestionModel | undefined;
  model: QuestionModel[] = [];

  correct: CorrectsModel = {
    questionId: 0,
    correctAnswer: ''
  };

  constructor(private service: BrainGameService, private activatedRoute: ActivatedRoute, private router: Router) { }

  number: any = 1;
  answers: any;
  iter = [1, 2, 3];

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as any;
    this.service.getQuestions(id).subscribe(model => {
      this.model = model;
      this.getQuestion();
    });   
  }

  getQuestion(): void {
    if(this.number > this.model.length)
    {      
      this.number = 1;
      this.router.navigate([`/`]);
    }

    this.question = this.model.find(b => b.number == this.number);
    this.answers = this.question?.answers.split(',') as any;
  };

  correctAnswer(answer: string): void {
    this.correct = { questionId: this.question?.id, correctAnswer: answer}
    
    this.service.corrects(this.correct).subscribe(() => {
      this.number++;
      this.getQuestion();
    });
  }
}