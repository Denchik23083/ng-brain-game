import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, LoginModel } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login: LoginModel = {
    email: '',
    password: '',
  };
  
  constructor(private service: AuthService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const loginUser = form.value as LoginModel;
    
    this.service.login(loginUser).subscribe();
  }
}