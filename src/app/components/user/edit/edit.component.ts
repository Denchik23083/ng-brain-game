import { Component, OnInit } from '@angular/core';
import { UserModel, UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  user: UserModel = {
    name: '',
    email: '',
  };

  constructor(private readonly service: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const editUser = form.value as UserModel;
    
    this.service.edit(editUser).subscribe();
  }
}