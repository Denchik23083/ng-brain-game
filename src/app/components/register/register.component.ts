import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BrainGameService, RegisterModel } from '../services/brain-game-service';

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
  
  constructor(private readonly service: BrainGameService, private router: Router) { }

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
