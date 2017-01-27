import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs';
import UserModel from "../models/user.model";
import JobModel from "../models/job.model";

@Injectable()
export class JobsService {

  jobs: FirebaseListObservable<JobModel[]>;
  job: FirebaseObjectObservable<JobModel>;
  jobCompanySubject: Subject<String>;

  constructor(public af: AngularFire) {
    this.jobCompanySubject = new Subject();

    this.jobs = this.af.database.list('/jobs', {
        query: {
          orderByChild: 'uid',
          equalTo: this.jobCompanySubject
        }
      });
  }

  fetchJobs(jobCompany){
    let self = this;

    setTimeout(function(){
      self.jobCompanySubject.next(jobCompany);
    },100);
  }

  fetchJobObj(id){
    this.job = this.af.database.object('/jobs/' + id);
  }

  addJob(job: JobModel) {
    this.jobs.push(job);
  }

  deleteJob(key: string) {    
    this.jobs.remove(key); 
  }

}
