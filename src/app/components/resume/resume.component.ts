import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import UserModel, { UserType } from "../../models/user.model";
import { UserService } from '../../services/user.service';
import { AccountsService } from '../../services/accounts.service';
import { ResumesService } from "../../services/resumes.service";
import ResumeModel from "../../models/resume.model";


@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  user : UserModel;
  account : FirebaseObjectObservable<UserModel>;
  accountDetail : UserModel;
  resume : FirebaseObjectObservable<ResumeModel>;
  resumeDetail : ResumeModel;
  id : String;

  constructor(
    private resumesService : ResumesService,
    private userService : UserService, 
    private accountsService : AccountsService, 
    private store: Store<UserModel>,
    private router: Router,
    private route: ActivatedRoute
    ) {

    route.params.subscribe(params => { 
      this.id = params['id']; 

      console.log("ID", this.id);

      store.select('appStore').subscribe((data : UserModel) => {
        this.user = data;

        if(this.user && this.user.uid){
          if(this.user.AccountType == UserType.Student){
            resumesService.fetchResumeObj(this.user.uid);
            accountsService.fetchAccount(this.user.uid);
          } else {
            resumesService.fetchResumeObj(this.id);
            accountsService.fetchAccount(this.id);
          }
          this.resume = resumesService.resume;
          this.account = accountsService.account;
        }

      });

      this.resume.subscribe((data : ResumeModel) => {
        this.resumeDetail = data;
      });

      this.account.subscribe((data : UserModel) => {
        this.accountDetail = data;
      });

    });
 
  }

  ngOnInit() {
  }

}
