import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs';
import UserModel from "../models/user.model";
import LocationModel from "../models/location.model";

@Injectable()
export class LocationService {

  locations: FirebaseListObservable<LocationModel[]>;
  location: FirebaseObjectObservable<LocationModel>;
  //jobCompanySubject: Subject<String>;

  constructor(public af: AngularFire) {
    //this.jobCompanySubject = new Subject();

    this.locations = this.af.database.list('/locations'/*, {
        query: {
          orderByChild: 'uid',
          equalTo: this.jobCompanySubject
        }
      }*/);
  }

  fetchLocations(jobCompany){
    let self = this;

    /*setTimeout(function(){
      self.jobCompanySubject.next(jobCompany);
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

}
