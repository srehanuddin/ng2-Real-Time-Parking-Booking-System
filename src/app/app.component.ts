import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import { AccountsService } from './services/accounts.service';
import { UserService } from './services/user.service';
import UserModel, { UserType } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  user : UserModel;
  userType = UserType;

  constructor(
    private userService : UserService, 
    private store: Store<UserModel>,
    private router: Router,
    ){
    userService.firebaseIsLogin();

    store.select('appStore').subscribe((data : UserModel) => {
      console.log("data from UserObservable App Component", data);
      this.user = data;
      
    });

  }

  logout(){
    this.userService.firebaseLogout();
    this.router.navigate(['/Login']);
  }

  canShow(user : UserModel, role){
    if(user.AccountType == "Admin"){
      return true;
    } else if(user.AccountType == role){
      return true;
    } else {
      return false;
    }
  }
}
