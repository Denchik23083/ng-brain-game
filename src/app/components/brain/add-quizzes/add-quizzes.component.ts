import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizService, QuizzesModel } from 'src/app/services/quiz/quiz.service';

@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.scss']
})
export class AddQuizzesComponent implements OnInit {

  quiz: QuizzesModel = {
    id: 0,
    name: '',
  };

  constructor(private service: QuizService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const addQuiz = form.value as QuizzesModel;
    
    this.service.addQuiz(addQuiz).subscribe(() => {
      this.router.navigate(['/quizzes']);
    });
  }
}
