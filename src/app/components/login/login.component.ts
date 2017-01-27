import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserService } from "../../services/user.service";
import UserModel from "../../models/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup;
  
  constructor(
    fb: FormBuilder, 
    private userService : UserService, 
    private router: Router,
    private store: Store<UserModel>
    ) {

    this.myForm = fb.group({
      'Email': ['', Validators.compose([Validators.required])],
      'Password': ['', Validators.required]
    });

    store.select('appStore').subscribe((data : UserModel) => {
      console.log("data from UserObservable", data);
      if(data && data.uid){
        this.router.navigate(['/Home']);
      }
    });
  }

  onSubmit(value: any): void {

    if(!this.myForm.valid){
      console.log("Form Not Valid");
      for(var key in this.myForm.controls){
        this.myForm.controls[key].touched = true;
      }
      return;
    }
    console.log('you submitted value: ', value);
    this.userService.firebaseLogin(value);

  }

  ngOnInit() {
  }
}
