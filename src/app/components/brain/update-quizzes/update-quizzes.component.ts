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

  constructor(private readonly service: QuizService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id') as any

    const updateQuiz = form.value as QuizzesModel;
    
    this.service.update(updateQuiz, id).subscribe(() => {
      this.router.navigate(['/quizzes']);
    });
  }

}
