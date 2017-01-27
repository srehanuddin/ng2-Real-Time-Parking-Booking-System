import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { appReducer } from './app.store';
import { myFirebaseAuthConfig, firebaseConfig } from './app.config';


import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { SampleComponent } from './components/sample/sample.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
//import { JobsService } from './services/jobs.service';
import { FeedbackService } from './services/feedback.service';
import { LocationService } from './services/location.service';
import { LoggedInGuardService } from './services/logged-in-guard.service';
import { AccountsService } from './services/accounts.service';
//import { ResumesService } from './services/resumes.service';
import { LoginComponent } from './components/login/login.component';
//import { CompaniesComponent } from './components/companies/companies.component';
import { UsersComponent } from './components/users/users.component';
//import { PostJobsComponent } from './components/post-jobs/post-jobs.component';
//import { JobsComponent } from './components/jobs/jobs.component';
//import { JobDetailComponent } from './components/job-detail/job-detail.component';
//import { ResumeAddComponent } from './components/resume-add/resume-add.component';
//import { ResumeComponent } from './components/resume/resume.component';
import { LocationAddComponent } from './components/location-add/location-add.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { FeedbackSendComponent } from './components/feedback-send/feedback-send.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoggedInGuardService] },
  { path: 'Home', component: HomeComponent, canActivate: [LoggedInGuardService]  },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },

  { path: 'LocationAdd', component: LocationAddComponent, data: {access : ["Admin"]}, canActivate: [LoggedInGuardService]  },
  { path: 'Locations', component: LocationsComponent, canActivate: [LoggedInGuardService]  },
  { path: 'LocationDetail/:id', component: LocationDetailComponent, canActivate: [LoggedInGuardService]  },
  { path: 'Users', component: UsersComponent, data: {access : ["Admin"]}, canActivate: [LoggedInGuardService]  },
  { path: 'Bookings', component: BookingsComponent, data: {access : ["Admin", "User"]}, canActivate: [LoggedInGuardService]  },

  { path: 'Feedback', component: FeedbackComponent, data: {access : ["Admin"]}, canActivate: [LoggedInGuardService]  },
  { path: 'FeedbackSend', component: FeedbackSendComponent, data: {access : ["User"]}, canActivate: [LoggedInGuardService]  },


  //{ path: 'Companies', component: CompaniesComponent, canActivate: [LoggedInGuardService]  },
  //{ path: 'JobsPost', component: PostJobsComponent, data: {access : ["Admin", "Company"]}, canActivate: [LoggedInGuardService]  },
  //{ path: 'Jobs', component: JobsComponent, canActivate: [LoggedInGuardService]  },
  //{ path: 'Jobs/:id', component: JobsComponent, canActivate: [LoggedInGuardService]  },
  //{ path: 'JobDetail/:id', component: JobDetailComponent, canActivate: [LoggedInGuardService]  },
  //{ path: 'Students', component: StudentsComponent, data: {access : ["Admin", "Company"]}, canActivate: [LoggedInGuardService]  },
 // { path: 'ResumeAdd', component: ResumeAddComponent, data: {access : ["Student"]}, canActivate: [LoggedInGuardService]  },
  //{ path: 'Resume/:id', component: ResumeComponent, data: {access : ["Admin", "Student", "Company"]}, canActivate: [LoggedInGuardService]  },
  { path: 'Sample', component: SampleComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SampleComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    LocationAddComponent,
    LocationsComponent,
    LocationDetailComponent,
    BookingsComponent,
    FeedbackComponent,
    FeedbackSendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    StoreModule.provideStore({ appStore: appReducer })
  ],
  providers: [
    UserService,
    AccountsService,
    LoggedInGuardService,
    LocationService,
    FeedbackService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
