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
  feedbackArr : FeedbackModel[];
  id : String;
  reply = {};

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
        this.feedback
        // .map(x => {
        //   console.log("x.Reply", x)
        //   if(x.Reply){
        //     x.Reply = JSON.parse(x.Reply);
        //   }
        //   return x;
        // }).
        .subscribe(data => {
          let tmp = [];
            for(var i = 0; i < data.length; i++){
              if(data[i].uid == this.user.uid || this.user.AccountType == UserType.Admin){
                if(data[i].Reply){
                  data[i].Reply = JSON.parse(<any>data[i].Reply);
                }
                tmp.push(data[i]);
              }
            }
            this.feedbackArr = tmp;
          /*if(this.user.AccountType == UserType.Admin){
            this.feedbackArr = data;
          } else {
            let tmp = [];
            for(var i = 0; i < data.length; i++){
              if(data[i].uid == this.user.uid){
                tmp.push(data[i]);
              }
            }
            this.feedbackArr = tmp;
          }  */
        })
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

  replyFeedback(item, text){
    console.log(item);
    console.log(text.value);

    item.Reply = item.Reply || [];

    var obj = {
      uid : this.user.uid,
      FirstName : this.user.FirstName,
      LastName : this.user.LastName,
      Text : text.value
    }

    item.Reply.push(obj);

    var str = JSON.stringify(item.Reply);
    this.feedbackService.updateFeedback(item.$key, {Reply : str})
  }

  

}
