import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterModel } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: RegisterModel = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  
  constructor(private readonly service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const newUser = form.value as RegisterModel;
    this.service.register(newUser).subscribe(() => {
      form.resetForm();
      this.router.navigate(['/login']);
    })
  }
}