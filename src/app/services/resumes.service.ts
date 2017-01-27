import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs';
import UserModel from "../models/user.model";
import ResumeModel from "../models/resume.model";

@Injectable()
export class ResumesService {

  resume: FirebaseObjectObservable<ResumeModel>;

  constructor(public af: AngularFire) {
    
  }

  fetchResumeObj(id){
    this.resume = this.af.database.object('/resumes/' + id);
  }

  addResume(resume: ResumeModel) {
    this.resume.set(resume);
  }

}
