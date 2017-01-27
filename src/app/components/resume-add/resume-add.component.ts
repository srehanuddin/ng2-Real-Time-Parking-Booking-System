import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { ResumesService } from "../../services/resumes.service";
import UserModel from "../../models/user.model";
import ResumeModel from "../../models/resume.model";

@Component({
  selector: 'app-resume-add',
  templateUrl: './resume-add.component.html',
  styleUrls: ['./resume-add.component.css']
})
export class ResumeAddComponent implements OnInit {

  myForm: FormGroup;
  user: UserModel;
  resume : ResumeModel;
  constructor(
    fb: FormBuilder, 
    private userService : UserService,
    private resumesService : ResumesService,
    private router: Router,
    private store: Store<UserModel>
    ) {


    this.myForm = fb.group({
      'LastEducation': ['', Validators.required],
      'LastEducationYear': ['', Validators.required],
      'LastEducationGrade': ['', Validators.required],
      'ProfessionalExperience': ['', Validators.required],
      'Skills': ['', Validators.required],
      'Description': ['', Validators.required],
    });
    

    store.select('appStore').subscribe((data : UserModel) => {
      console.log("data from UserObservable", data);
      if(data && data.uid){
        this.user = data;

        this.resumesService.fetchResumeObj(data.uid);

        this.resumesService.resume.subscribe((resume : ResumeModel) => {
          
          this.myForm = fb.group({
              'LastEducation': [resume.LastEducation || '', Validators.required],
              'LastEducationYear': [resume.LastEducationYear || '', Validators.required],
              'LastEducationGrade': [resume.LastEducationGrade || '', Validators.required],
              'ProfessionalExperience': [resume.ProfessionalExperience || '', Validators.required],
              'Skills': [resume.Skills || '', Validators.required],
              'Description': [resume.Description || '', Validators.required],
            });

          this.resume = resume;

        });

      }
    });

  }

  onSubmit(value: ResumeModel): void {

    if(!this.myForm.valid){
      console.log("Form Not Valid");
      return;
    }

    value.uid = this.user.uid;

    console.log('you submitted value: ', value);
    this.resumesService.addResume(value);
    this.router.navigate(['/Home']);

  }

  ngOnInit() {
  }

}
