import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/services/auth.service';

@Component({
  selector: 'app-quizzes-page',
  templateUrl: './quizzes-page.component.html',
  styleUrls: ['./quizzes-page.component.scss']
})
export class QuizzesPageComponent implements OnInit {

  public permission = Permission;

  constructor() { }

  ngOnInit(): void {
  }

}
