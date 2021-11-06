import { Component, OnInit } from '@angular/core';
import { BrainGameService, LoginModel } from '../services/brain-game-service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  
  constructor(private readonly service: BrainGameService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const user = form.value as LoginModel;
    this.service.login(user).subscribe(() => {
      form.resetForm();
    })
    this.router.navigate(['/main']);
  }

}
