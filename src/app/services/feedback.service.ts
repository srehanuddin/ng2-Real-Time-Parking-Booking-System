import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs';
import UserModel from "../models/user.model";
import FeedbackModel from "../models/feedback.model";

@Injectable()
export class FeedbackService {

  feedbacks: FirebaseListObservable<FeedbackModel[]>;

  constructor(public af: AngularFire) {
    this.feedbacks = this.af.database.list('/feedback');
  }

  fetchFeedbacks(jobCompany){
    let self = this;
  }


  addFeedback(job: FeedbackModel) {
    this.feedbacks.push(job);
  }

  deleteFeedback(key: string) {    
    this.feedbacks.remove(key); 
  }

  updateFeedback(key: string, obj) {
    this.feedbacks.update(key, obj);
  }

}
