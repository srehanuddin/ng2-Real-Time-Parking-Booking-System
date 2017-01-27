import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocationService } from "../../services/location.service";
import UserModel, { UserType } from "../../models/user.model";
import LocationModel from "../../models/location.model";
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  user : UserModel;
  locations : FirebaseListObservable<LocationModel[]>;

  constructor(
    private locationService : LocationService,
    private userService : UserService, 
    private store: Store<UserModel>,
    private router: Router,
    private route: ActivatedRoute
    ) {

    store.select('appStore').subscribe((data : UserModel) => {
    
      this.user = data;
      
      if(!(data && data.uid)){
        this.router.navigate(['/Login']);
        return;
      }

      this.locations = locationService.locations;
    });
 
  }

  ngOnInit() {
  }

  canDelete(user : UserModel, uid){
    if(user.AccountType == "Admin"){
      return true;
    }
  }

  delete(key : string){
    console.log("key : ", key);
    this.locationService.deleteLocation(key)
  }
}
