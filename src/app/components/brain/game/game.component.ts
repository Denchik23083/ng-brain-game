import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionModel, QuestionService } from 'src/app/services/quiz/question.service';
import { CorrectsModel, CorrectService } from 'src/app/services/quiz/correct.service';

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

  constructor(private service: QuestionService, 
    private correctService: CorrectService,
    private activatedRoute: ActivatedRoute, 
    private router: Router) { }
 
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
    
    this.correctService.corrects(this.correct).subscribe(() => {
      this.number++;
      this.getQuestion();
    });
  }
}