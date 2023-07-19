import { Component, Input, OnInit } from '@angular/core';
import { BrainGameService, QuizzesModel } from 'src/app/services/brain-game-service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, Permission } from 'src/app/services/auth.service';
import { CheckPermission } from 'src/app/utils/check-permission';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent extends CheckPermission implements OnInit {

  @Input()
  permissions?: Permission[];

  hasPermission = false;
  
  quizzes: QuizzesModel = {
    id: 0,
    name: '',
  };

  quizzes$!: BehaviorSubject<QuizzesModel[]>;

  constructor(authService: AuthService, private service: BrainGameService, private router: Router) { 
    super(authService);
    this.quizzes$ = service.quizzes$;
  }

  ngOnInit(): void {
    this.hasPermission = super.checkPermission(this.permissions);
    this.service.getQuizzes().subscribe();
  }

  game(id: number): void {
    this.router.navigate([`/quizzes/${id}`])
  }
}