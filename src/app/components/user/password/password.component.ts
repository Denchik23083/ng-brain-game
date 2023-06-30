import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordModel, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  password: PasswordModel = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private readonly service: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const newPassword = form.value as PasswordModel;
    
    this.service.password(newPassword).subscribe();
  }
}