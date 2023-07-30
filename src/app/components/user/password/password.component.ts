import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PasswordModel, UserService } from 'src/app/services/users/user.service';

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

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const newPassword = form.value as PasswordModel;
    
    this.service.password(newPassword).subscribe();
  }
}