import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CorrectsModel } from 'src/app/services/quiz/correct.service';
import { QuestionService, QuestionWriteModel } from 'src/app/services/quiz/question.service';

@Component({
  selector: 'app-update-view',
  templateUrl: './update-view.component.html',
  styleUrls: ['./update-view.component.scss']
})
export class UpdateViewComponent implements OnInit {

  firstAnswer: string = "";
  secondAnswer: string = "";
  thirdAnswer: string = "";

  correctAnswer: string = "";

  question: QuestionWriteModel = {
    id: 0,
    number: undefined!,
    question: '',
    answers: '',
    correct: undefined!,
    quizId: undefined!
  };

  correct: CorrectsModel = {
    correctAnswer: ''
  }

  isFirstDisabled: boolean = false;
  isSecondDisabled: boolean = false;
  isThirdDisabled: boolean = false;

  firstChecked: boolean = false;
  secondChecked: boolean = false;
  thirdChecked: boolean = false;
  
  id!: number;
  questionId!: number;

  constructor(private service: QuestionService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as any;
    this.questionId = this.activatedRoute.snapshot.paramMap.get('questionId') as any;
  }

  submit(form: NgForm): void {
    this.question.answers = `${this.firstAnswer},${this.secondAnswer},${this.thirdAnswer}`;
    this.question.quizId = this.id;

    if(this.firstChecked) this.correct.correctAnswer = this.firstAnswer;
    if(this.secondChecked) this.correct.correctAnswer = this.secondAnswer;
    if(this.thirdChecked) this.correct.correctAnswer = this.thirdAnswer;

    this.question.correct = this.correct;

    this.service.updateQuestion(this.question, this.questionId).subscribe(() => {
      this.router.navigate([`/quizzes/${this.id}/view`]);
    });
  }

  routers(): void{
    this.router.navigate([`/quizzes/${this.id}/view`]);
  }

  firstCorrect(): void{
    this.firstChecked = !this.firstChecked;
    if(this.firstChecked)
    {
      this.isSecondDisabled = true;
      this.isThirdDisabled = true;
    }
    else{
      this.isSecondDisabled = false;
      this.isThirdDisabled = false;
    }
  }

  secondCorrect(): void{
    this.secondChecked = !this.secondChecked;
    if(this.secondChecked)
    {
      this.isFirstDisabled = true;
      this.isThirdDisabled = true;
    }
    else{
      this.isFirstDisabled = false;
      this.isThirdDisabled = false;
    }
  }

  thirdCorrect(): void{
    this.thirdChecked = !this.thirdChecked;
    if(this.thirdChecked)
    {
      this.isFirstDisabled = true;
    this.isSecondDisabled = true;
    }
    else{
      this.isFirstDisabled = false;
      this.isSecondDisabled = false;
    }
  }

}
