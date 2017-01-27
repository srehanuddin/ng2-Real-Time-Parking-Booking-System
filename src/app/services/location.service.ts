import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs';
import UserModel from "../models/user.model";
import LocationModel from "../models/location.model";
import BookingModel from "../models/booking.model";

@Injectable()
export class LocationService {

  locations: FirebaseListObservable<LocationModel[]>;
  location: FirebaseObjectObservable<LocationModel>;
  bookings: FirebaseListObservable<BookingModel[]>;
  bookingsLocationSlotSubject: Subject<any>;

  constructor(public af: AngularFire) {
    this.bookingsLocationSlotSubject = new Subject();

    this.locations = this.af.database.list('/locations');

    this.bookings = this.af.database.list('/bookings', {
      query: this.bookingsLocationSlotSubject
    });

    /*, {
        query: {
          orderByChild: 'AccountType',
          equalTo: this.accountTypeSubject
        }
      }*/
  }

  /*fetchLocations(jobCompany){
    let self = this;
  }*/

  fetchBookings(obj){
    let self = this;

    this.bookings = this.af.database.list('/bookings', {
      query: obj
    });

    /*setTimeout(function(){
      self.bookingsLocationSlotSubject.next(obj);
    },100);*/
  }

  fetchLocationObj(id){
    this.location = this.af.database.object('/locations/' + id);
  }

  addLocation(job: LocationModel) {
    this.locations.push(job);
  }

  deleteLocation(key: string) {    
    this.locations.remove(key); 
  }

  addBooking(job: BookingModel) {
    this.bookings.push(job);
  }

  deleteBooking(key: string) {    
    this.bookings.remove(key); 
  }

}
