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
  answers: string[] | undefined;
  number: number = 1;

  iter: number[] = [1, 2, 3];

  correct: CorrectsModel = {
    questionId: 0,
    correctAnswer: ''
  };

  constructor(private service: BrainGameService, private activatedRoute: ActivatedRoute, private router: Router) { }
 
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as any;
    this.service.getQuestions(id).subscribe(() => {      
      this.getQuestion();
    });   
  }

  getQuestion(): void {
    const questions = this.service.questions$.value;
    if(this.number > questions.length)
    {      
      this.number = 1;
      this.router.navigate([`/`]);
    }

    this.question = questions.find(b => b.number == this.number);
    this.answers = this.question?.answers.split(',');
  };

  correctAnswer(answer: string): void {
    this.correct = { questionId: this.question?.id, correctAnswer: answer}
    
    this.service.corrects(this.correct).subscribe(() => {
      this.number++;
      this.getQuestion();
    });
  }
}