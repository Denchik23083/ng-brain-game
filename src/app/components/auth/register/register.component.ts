import { Component, OnInit } from '@angular/core';
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
  
  constructor(private readonly service: AuthService) { }

  ngOnInit(): void {
  }

  submit(): void {
    this.service.register(this.user).subscribe();
  }
}