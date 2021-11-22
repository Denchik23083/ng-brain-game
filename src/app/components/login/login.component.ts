import { Component, OnInit } from '@angular/core';
import { AuthService, LoginModel } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  
  constructor(private readonly service: AuthService, private router: Router, private https: HttpClient) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const user = form.value as LoginModel;
    this.service.login(user).subscribe(() => {
      form.resetForm();
      this.router.navigate(['/main']);
    })
  }

}
