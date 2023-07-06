import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, Gender, RegisterModel } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: RegisterModel = {
    name: '',
    email: '',
    gender: {
      type: Gender.male
    },
    password: '',
    confirmPassword: '',
  };
  
  constructor(private readonly service: AuthService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const registerUser = form.value as RegisterModel;

    this.service.register(registerUser).subscribe();
  }
}