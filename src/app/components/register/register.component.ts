import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import UserModel, {UserTypeArr, UserType} from "../../models/user.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myForm: FormGroup;
  userTypeArr = UserTypeArr;
  userType = UserType;
  constructor(
    fb: FormBuilder, 
    private userService : UserService,
    private router: Router,
    private store: Store<UserModel>
    ) {

    this.myForm = fb.group({
      'FirstName': ['', Validators.required],
      'LastName': ['', Validators.required],
      'Email': ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.required],
      'AccountType': ['User', Validators.required],
    });

    store.select('appStore').subscribe((data : UserModel) => {
      console.log("data from UserObservable", data);
      if(data && data.uid){
        this.router.navigate(['/Home']);
      }
    });



    /*userService.UserObservable.subscribe(data => {
      console.log("data from UserObservable", data);
      if(data && data.uid){
        this.router.navigate(['/Home']);
      }
    });*/
  }

  onSubmit(value: any): void {

    if(!this.myForm.valid){
      console.log("Form Not Valid");
      return;
    }

    console.log('you submitted value: ', value);
    this.userService.firebaseCreateUser(value);

  }

  ngOnInit() {
  }

}
