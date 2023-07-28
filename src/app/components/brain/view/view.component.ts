import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService, Permission } from 'src/app/services/auth/auth.service';
import { QuestionModel, QuestionService } from 'src/app/services/quiz/question.service';
import { CheckPermission } from 'src/app/utils/check-permission';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent extends CheckPermission implements OnInit {

  @Input()
  permissions?: Permission[];
  hasPermissions = true;
  id!: number;

  questions$!: BehaviorSubject<QuestionModel[]>;

  constructor(private service: QuestionService, private router: Router, private activatedRoute: ActivatedRoute,  authService: AuthService) { 
    super(authService);
    this.questions$ = service.questions$;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as any;
    this.hasPermissions = super.checkPermission(this.permissions);
    this.service.getQuestions(this.id).subscribe();   
  }

  add(): void {
    this.router.navigate([`/quizzes/${this.id}/view/add`]);
  }

  edit(questionId: number): void {
    this.router.navigate([`/quizzes/${this.id}/view/${questionId}/edit`]);
  }

  remove(questionId: number): void {
    //this.service.remove(id).subscribe();
  }

}
