import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { JobsService } from "../../services/jobs.service";
import UserModel from "../../models/user.model";
import JobModel from "../../models/job.model";


@Component({
  selector: 'app-post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.css']
})
export class PostJobsComponent implements OnInit {

  myForm: FormGroup;
  user: UserModel;
  constructor(
    fb: FormBuilder, 
    private userService : UserService,
    private jobsService : JobsService,
    private router: Router,
    private store: Store<UserModel>
    ) {
      

    this.myForm = fb.group({
      'JobTitle': ['', Validators.required],
      'JobDescription': ['', Validators.required],
      'Salary': ['', Validators.required],
      'JobType': ['', Validators.required],
    });

    store.select('appStore').subscribe((data : UserModel) => {
      console.log("data from UserObservable", data);
      if(data && data.uid){
        this.user = data;
      }
    });

    /*userService.UserObservable.subscribe(data => {
      console.log("data from UserObservable", data);
      if(data && data.uid){
        this.router.navigate(['/Home']);
      }
    });*/
  }

  onSubmit(value: JobModel): void {

    if(!this.myForm.valid){
      console.log("Form Not Valid");
      return;
    }

    value.uid = this.user.uid;
    value.Company = this.user.Company;

    console.log('you submitted value: ', value);
    this.jobsService.addJob(value);
    this.router.navigate(['/Home']);

  }

  ngOnInit() {
  }

}
