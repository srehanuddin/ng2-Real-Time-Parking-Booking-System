import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { FeedbackService } from "../../services/feedback.service";
import UserModel from "../../models/user.model";
import FeedbackModel from "../../models/feedback.model";

@Component({
  selector: 'app-feedback-send',
  templateUrl: './feedback-send.component.html',
  styleUrls: ['./feedback-send.component.css']
})
export class FeedbackSendComponent implements OnInit {

  myForm: FormGroup;
  user: UserModel;
  constructor(
    fb: FormBuilder, 
    private userService : UserService,
    private feedbackService : FeedbackService,
    private router: Router,
    private store: Store<UserModel>
    ) {
      

    this.myForm = fb.group({
      'Title': ['', Validators.required],
      'Description': ['', Validators.required]
    });

    store.select('appStore').subscribe((data : UserModel) => {
      console.log("data from UserObservable", data);
      if(data && data.uid){
        this.user = data;
      }
    });
  }

  onSubmit(value: FeedbackModel): void {

    if(!this.myForm.valid){
      console.log("Form Not Valid");
      return;
    }

    value.uid = this.user.uid;
    value.FirstName = this.user.FirstName;
    value.LastName = this.user.LastName;
    //value.Company = this.user.Company;

    console.log('you submitted value: ', value);
    this.feedbackService.addFeedback(value);
    this.router.navigate(['/Home']);

  }

  ngOnInit() {
  }

}
