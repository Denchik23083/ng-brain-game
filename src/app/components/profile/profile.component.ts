import { Component, OnInit } from '@angular/core';
import { BrainGameService, UserModel } from 'src/app/services/brain-game-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: UserModel = {
    name: '',
    email: '',
    password: ''
  };

  user$!: BehaviorSubject<UserModel[]>;  

  constructor(private service: BrainGameService, private router: Router) {
    this.user$ = service.user$;
   }

   loadData(): void {
    this.service.get().subscribe();
   }

  ngOnInit(): void {
  }

}
