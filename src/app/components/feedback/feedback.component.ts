import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FeedbackService } from '../../services/feedback.service';
import UserModel, { UserType } from "../../models/user.model";
import FeedbackModel from "../../models/feedback.model";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  user : UserModel;
  feedback : FirebaseListObservable<FeedbackModel[]>;
  id : String;

  constructor(
    private feedbackService : FeedbackService,
    private userService : UserService, 
    private store: Store<UserModel>,
    private router: Router,
    private route: ActivatedRoute
    ) {

    route.params.subscribe(params => { 
      this.id = params['id']; 

      console.log("ID", this.id);

      store.select('appStore').subscribe((data : UserModel) => {
      
        this.user = data;
        
        if(!(data && data.uid)){
          this.router.navigate(['/Login']);
          return;
        }
        
        feedbackService.fetchFeedbacks(null);
        this.feedback = feedbackService.feedbacks;
      });


    });
 
  }

  ngOnInit() {
  }

  canDelete(user : UserModel, uid){
    if(user.AccountType == "Admin"){
      return true;
    } else if(user.uid == uid){
      return true;
    } else {
      return false;
    }
  }

  delete(key : string){
    console.log("key : ", key);
    this.feedbackService.deleteFeedback(key)
  }

}
