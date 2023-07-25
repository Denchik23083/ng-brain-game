import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { QuizService, QuizzesModel } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {
  
  quizzes: QuizzesModel = {
    id: 0,
    name: '',
  };

  quizzes$!: BehaviorSubject<QuizzesModel[]>;

  constructor(private service: QuizService, private router: Router) { 
    this.quizzes$ = service.quizzes$;
  }

  ngOnInit(): void {
    this.service.getQuizzes().subscribe();
  }

  game(id: number): void {
    this.router.navigate([`/quizzes/${id}`])
  }
}