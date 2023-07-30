import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, RegisterModel, GenderModel } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  register: RegisterModel = {
    name: '',
    email: '',
    genderId: 0, 
    password: '',
    confirmPassword: '',
  };

  genders: GenderModel[] = [];
  
  constructor(private service: AuthService) { }

  ngOnInit(): void {
    this.service.getGenders().subscribe(gender => this.genders = gender);
  }

  submit(form: NgForm): void {
    const registerUser = form.value as RegisterModel;
    
    this.service.register(registerUser).subscribe();
  }
}