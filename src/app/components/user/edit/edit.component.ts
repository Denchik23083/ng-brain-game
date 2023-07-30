import { Component, OnInit } from '@angular/core';
import { UserWriteModel, UserService } from 'src/app/services/users/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  user: UserWriteModel = {
    name: '',
    email: '',
  };

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm): void {
    const editUser = form.value as UserWriteModel;
    
    this.service.edit(editUser).subscribe();
  }
}