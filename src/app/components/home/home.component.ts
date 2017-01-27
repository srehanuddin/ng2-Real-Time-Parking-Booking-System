import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import UserModel from '../../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user : UserModel;

  constructor(private userService : UserService){
    userService.UserObservable.subscribe(data => {
      console.log("data from UserObservable", data);
      this.user = data;
    });
  }

  ngOnInit() {
  }

}
