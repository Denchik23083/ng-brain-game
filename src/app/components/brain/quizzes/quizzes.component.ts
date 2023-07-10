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
    name: '',
    point: 0
  };

  quizzes$!: BehaviorSubject<QuizzesModel[]>;

  constructor(authService: AuthService, private service: BrainGameService, private router: Router) { 
    super(authService);
    this.quizzes$ = service.quizzes$;
  }

  ngOnInit(): void {
    this.hasPermission = super.checkPermission(this.permissions);
  }

  animal(): void {
    this.quizzes.name = 'Animals';
    this.submit();
  }

  plants(): void {
    this.quizzes.name = 'Plants';
    this.submit();
  }

  mushrooms(): void {
    this.quizzes.name = 'Mushrooms';
    this.submit();
  }

  submit() : void {
    this.service.quizzes(this.quizzes).subscribe(() => {
      this.router.navigate(['/quizzes/new']);
    });
  }
}