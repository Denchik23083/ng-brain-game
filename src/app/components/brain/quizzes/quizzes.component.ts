import { Component, Input, OnInit } from '@angular/core';
import { BrainGameService, QuizzesModel } from 'src/app/services/brain-game-service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, Permission, TokenData } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.scss']
})
export class QuizzesComponent implements OnInit {

  @Input()
  permissions?: Permission[];

  hasPermission = false;

  quizzes: QuizzesModel = {
    name: '',
    point: 0
  };

  quizzes$!: BehaviorSubject<QuizzesModel[]>;

  tokenData: BehaviorSubject<TokenData>;

  constructor(private service: BrainGameService, private authService: AuthService, private router: Router) { 
    this.quizzes$ = service.quizzes$;
    this.tokenData = authService.tokenData$;
  }

  ngOnInit(): void {
    this.checkPermission();
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

  checkPermission(): void {   
    if(!this.tokenData.value) { 
      this.hasPermission = false;
      return; 
    }

    const requiredRermissions = this.permissions;

    if(!requiredRermissions) { 
      this.hasPermission = false;
      return; 
    }

    for(const permission of requiredRermissions){
      const hasPermission = this.tokenData.value.permissions.includes(permission);
      if (!hasPermission) {
        this.hasPermission = false;
      }
    }  
    
    this.hasPermission = true;
  }
}