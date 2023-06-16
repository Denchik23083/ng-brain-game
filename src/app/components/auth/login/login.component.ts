import { Component, OnInit } from '@angular/core';
import { AuthService, LoginModel } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: LoginModel = {
    email: '',
    password: '',
  };
  
  constructor(private readonly service: AuthService) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.service.login(this.user).subscribe();
  }
}