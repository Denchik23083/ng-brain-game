import { Component, OnInit } from '@angular/core';
import { BrainGameService, UserModel } from 'src/app/services/brain-game-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: UserModel = {
    name: '',
    email: '',
    password: ''
  };

  user$!: BehaviorSubject<UserModel[]>;

  constructor(private service: BrainGameService, private router: Router) {
    this.user$ = service.user$;
   }

  ngOnInit(): void {
    // this.service.get().subscribe();
  }

}
