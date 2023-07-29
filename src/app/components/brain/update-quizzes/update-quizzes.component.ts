import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService, QuizzesModel } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-update-quizzes',
  templateUrl: './update-quizzes.component.html',
  styleUrls: ['./update-quizzes.component.scss']
})
export class UpdateQuizzesComponent implements OnInit {

  quiz: QuizzesModel = {
    id: 0,
    name: '',
  };

  id!: number;

  constructor(private readonly service: QuizService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as any;
  }

  submit(form: NgForm): void {
    const updateQuiz = form.value as QuizzesModel;
    
    this.service.updateQuiz(updateQuiz, this.id).subscribe(() => {
      this.router.navigate(['/quizzes']);
    });
  }

}
