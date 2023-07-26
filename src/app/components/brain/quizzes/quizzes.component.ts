import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { QuizService, QuizzesModel } from 'src/app/services/quiz/quiz.service';
import { AuthService, Permission } from 'src/app/services/auth/auth.service';
import { CheckPermission } from 'src/app/utils/check-permission';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent extends CheckPermission implements OnInit {
  
  @Input()
  permissions?: Permission[];
  hasPermissions = true;

  quizzes: QuizzesModel = {
    id: 0,
    name: '',
  };

  quizzes$!: BehaviorSubject<QuizzesModel[]>;

  constructor(private service: QuizService, private router: Router, authService: AuthService) { 
    super(authService);
    this.quizzes$ = service.quizzes$;
  }

  ngOnInit(): void {
    this.service.getQuizzes().subscribe();
    this.hasPermissions = super.checkPermission(this.permissions);
  }

  game(id: number): void {
    this.router.navigate([`/quizzes/${id}`]);
  }

  add(): void {
    this.router.navigate(['/quizzes/add']);
  }

  edit(id: number): void {
    this.router.navigate([`/quizzes/${id}/edit`]);
  }

  remove(id: number): void {
  }
}