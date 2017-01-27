import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import UserModel, { UserType } from "../../models/user.model";
import { UserService } from '../../services/user.service';
import { LocationService } from "../../services/location.service";
import { ResumesService } from "../../services/resumes.service";
import ResumeModel from "../../models/resume.model";
import LocationModel from "../../models/location.model";
import BookingModel from "../../models/booking.model";


@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css']
})
export class LocationDetailComponent implements OnInit {

  user : UserModel;
  //account : FirebaseObjectObservable<UserModel>;
  bookingsDetail : BookingModel[];
  location : FirebaseObjectObservable<LocationModel>;
  locationDetail : LocationModel;
  id : String;
  counter = Array;
  isDialogShow : Boolean;
  selectedSlot : Number;
  myForm: FormGroup;
  BookingErrorMessage : String;

  constructor(
    private fb: FormBuilder,
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

      let currentTime = Date.now();
      let LocationStartTime = currentTime + "|" + this.id;
      this.locationsService.fetchBookings({
        orderByChild: 'LocationStartTime',
        startAt: LocationStartTime
      });
      /*{
        orderByChild: 'LocationStartTime',
        startAt: LocationStartTime
      }*/
      /*{
        orderByChild: 'LocationStartTime',
        startAt: "1485522000000|-KbTqmwY8Q7wz0Xem-2u"
      }*/
      

      this.locationsService.bookings.subscribe((data : BookingModel[]) => {
        console.log("this.locationsService.bookings.subscribe", data)
        this.bookingsDetail = data;
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
    this.BookingErrorMessage = "";

    this.myForm = this.fb.group({
      'StartDate': ['', Validators.required],
      'StartTime': ['', Validators.required],
      'Hours': ['', Validators.required]
    });
  }

  onSubmitBooking(value: any): void {

    let self = this;
    if(!self.myForm.valid){
      console.log("Form Not Valid");
      self.BookingErrorMessage = "Entered Values Are Invalid";
      return;
    }

    value.uid = self.user.uid;

    let currentDate = new Date();
    let selectedDate = new Date(value.StartDate + " " + value.StartTime);

    // if(selectedDate < currentDate){
    //   self.BookingErrorMessage = "Reservation time can not be past time";
    //   return;
    // }

    let endDate = new Date(selectedDate);
    endDate.setHours(endDate.getHours() + value.Hours);

    let  obj : BookingModel = {
      uid : self.user.uid,
      FirstName : self.user.FirstName,
      LastName : self.user.LastName,
      Location : self.locationDetail.Location,
      LocationID : self.id,
      Slot : self.selectedSlot,
      LocationSlot : self.id + "|" + self.selectedSlot,
      LocationStartTime : selectedDate.getTime() + "|" + self.id,
      StartDate : value.StartDate,
      StartTime : value.StartTime,
      Hours : value.Hours,
      StartTimeStamp : selectedDate.getTime(),
    }

    /*self.locationsService.fetchBookings({
        orderByChild: 'LocationSlot',
        equalTo: obj.LocationSlot
    });

    self.locationsService.bookings.subscribe((data : BookingModel[]) => {
        console.log("Booking subscribe", data);

        let conflictFound = false;

        for(let i = 0; i < data.length; i++){

          let startTime = new Date(data[i].StartTimeStamp.toString());
          let endTime = new Date(startTime)
          endTime.setHours(Number(endTime.getHours()) + Number(data[i].Hours));
          
          if(selectedDate >= startTime && selectedDate <= endTime || endDate >= startTime && endDate <= endTime ){
            conflictFound = true;
          }

          if(conflictFound){
            self.BookingErrorMessage = "Location Already Reserved";
            return;
          }
        }

    });*/

    console.log('you submitted value: ', value);
    console.log('Booking Obj: ', obj);
    this.locationsService.addBooking(obj);
    //this.router.navigate(['/Home']);
  }

  ngOnInit() {
  }

}
