import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.scss']
})
export class ViewPageComponent implements OnInit {

  public permission = Permission;

  constructor() { }

  ngOnInit(): void {
  }

}
