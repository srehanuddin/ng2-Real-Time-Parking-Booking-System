import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { JobsService } from '../../services/jobs.service';
import UserModel, { UserType } from "../../models/user.model";
import JobModel from "../../models/job.model";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  user : UserModel;
  job : FirebaseObjectObservable<JobModel>;
  jobDetail : JobModel;
  id : String;

  constructor(
    private jobsService : JobsService,
    private userService : UserService, 
    private store: Store<UserModel>,
    private router: Router,
    private route: ActivatedRoute
    ) {

    route.params.subscribe(params => { 
      this.id = params['id']; 

      console.log("ID", this.id);

      jobsService.fetchJobObj(this.id);

      this.job = jobsService.job;

      store.select('appStore').subscribe((data : UserModel) => {
        this.user = data;
      });

      this.job.subscribe((data : JobModel) => {
        this.jobDetail = data;
      });

    });
 
  }

  ngOnInit() {
  }

}
