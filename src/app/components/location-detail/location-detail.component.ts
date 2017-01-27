import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import UserModel, { UserType } from "../../models/user.model";
import { UserService } from '../../services/user.service';
import { LocationService } from "../../services/location.service";
import { ResumesService } from "../../services/resumes.service";
import ResumeModel from "../../models/resume.model";
import LocationModel from "../../models/location.model";


@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  user : UserModel;
  //account : FirebaseObjectObservable<UserModel>;
  //accountDetail : UserModel;
  location : FirebaseObjectObservable<LocationModel>;
  locationDetail : LocationModel;
  id : String;
  counter = Array;
  isDialogShow : Boolean;
  selectedSlot : Number;

  constructor(
    private resumesService : ResumesService,
    private userService : UserService, 
    private locationsService : LocationService, 
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
          /*if(this.user.AccountType == UserType.Student){
            resumesService.fetchResumeObj(this.user.uid);
            accountsService.fetchAccount(this.user.uid);
          } else {
            resumesService.fetchResumeObj(this.id);
            accountsService.fetchAccount(this.id);
          }*/

          locationsService.fetchLocationObj(this.id);
          this.location = locationsService.location;
          //this.account = accountsService.account;
        }

      });

      this.location.subscribe((data : LocationModel) => {
        this.locationDetail = data;
      });

      /*this.account.subscribe((data : UserModel) => {
        this.accountDetail = data;
      });*/

    });
 
  }

  navigateReservation(Locationkey, slot){
    console.log("Locationkey")
    console.log(Locationkey, slot)

    this.selectedSlot = slot;
    this.isDialogShow = true;
  }

  ngOnInit() {
  }

}
