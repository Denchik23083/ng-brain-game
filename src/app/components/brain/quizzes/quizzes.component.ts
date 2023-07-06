import { Component, Input, OnInit } from '@angular/core';
import { BrainGameService, QuizzesModel } from 'src/app/services/brain-game-service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService, Permission, TokenData } from 'src/app/services/auth.service';
import { MainComponent } from '../../main/main.component';
import { WeatherModel } from 'src/app/services/user.service';

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
    this.hasPermission = this.checkPermission(this.permissions);
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

  checkPermission(requiredRermissions?: Permission[]): boolean {   
    if(!this.tokenData.value) {
      return false; 
    }

    if(!requiredRermissions) {
      return true;
    }

    for(const permission of requiredRermissions){
      const hasPermission = this.tokenData.value.permissions.includes(permission);
      if (!hasPermission) {
        return false;
      }
    }  
    
    return true;
  }
}