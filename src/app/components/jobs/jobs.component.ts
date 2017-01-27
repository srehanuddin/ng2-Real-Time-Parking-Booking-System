import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { JobsService } from '../../services/jobs.service';
import UserModel, { UserType } from "../../models/user.model";
import JobModel from "../../models/job.model";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  user : UserModel;
  jobs : FirebaseListObservable<JobModel[]>;
  id : String;

  constructor(
    private jobsService : JobsService,
    private userService : UserService, 
    private store: Store<UserModel>,
    private router: Router,
    private route: ActivatedRoute
    ) {

/*
    store.select('appStore').subscribe((data : UserModel) => {
      console.log("data from UserObservable", data);
      if(data && data.uid){
        this.router.navigate(['/Home']);
      }
    });
    */

    route.params.subscribe(params => { 
      this.id = params['id']; 

      console.log("ID", this.id);

      store.select('appStore').subscribe((data : UserModel) => {
      
        this.user = data;
        
        if(!(data && data.uid)){
          this.router.navigate(['/Login']);
          return;
        }

        if(this.user.AccountType == UserType.Company){
          jobsService.fetchJobs(this.user.uid);
        } else if(this.id) {
          jobsService.fetchJobs(this.id);
        } else { 
          jobsService.fetchJobs(null);
        }
        this.jobs = jobsService.jobs;
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
    this.jobsService.deleteJob(key)
  }

}
