import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../services/user.service";
import { LocationService } from "../../services/location.service";
import UserModel from "../../models/user.model";
import LocationModel from "../../models/location.model";

@Component({
  selector: 'app-location-add',
  templateUrl: './location-add.component.html',
  styleUrls: ['./location-add.component.css']
})
export class LocationAddComponent implements OnInit {

  myForm: FormGroup;
  user: UserModel;
  constructor(
    fb: FormBuilder, 
    private userService : UserService,
    private locationService : LocationService,
    private router: Router,
    private store: Store<UserModel>
    ) {
      

    this.myForm = fb.group({
      'Location': ['', Validators.required],
      'NumberOfSlots': ['', Validators.required]
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

  onSubmit(value: LocationModel): void {

    if(!this.myForm.valid){
      console.log("Form Not Valid");
      return;
    }

    value.uid = this.user.uid;

    console.log('you submitted value: ', value);
    this.locationService.addLocation(value);
    this.router.navigate(['/Home']);

  }

  ngOnInit() {
  }

}
