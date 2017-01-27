import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LocationService } from '../../services/location.service';
import UserModel, { UserType } from "../../models/user.model";
import BookingModel from "../../models/booking.model";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  user : UserModel;
  bookings : FirebaseListObservable<BookingModel[]>;
  id : String;
  bookingsArr : BookingModel[];

  constructor(
    private locationsService : LocationService,
    private userService : UserService, 
    private store: Store<UserModel>,
    private router: Router,
    private route: ActivatedRoute
    ) {

    route.params.subscribe(params => { 
      this.id = params['id']; 

      console.log("ID", this.id);

      store.select('appStore').subscribe((data : UserModel) => {
      
        this.user = data;
        
        if(!(data && data.uid)){
          this.router.navigate(['/Login']);
          return;
        }

        if(this.user.AccountType == UserType.User){
          //LocationService.fetch(this.user.uid);
          locationsService.fetchBookings({
            orderByChild: 'uid',
            startAt: this.user.uid
          })

        } else { 
          locationsService.fetchBookings({});
        }
        this.bookings = locationsService.bookings;
        this.bookings.subscribe(data => {
          if(this.user.AccountType == UserType.Admin){
            this.bookingsArr = data;
          } else {
            let tmp = [];
            for(var i = 0; i < data.length; i++){
              if(data[i].uid == this.user.uid){
                tmp.push(data[i]);
              }
            }
            this.bookingsArr = tmp;
          }  
        })
      });


    });
 
  }

  ngOnInit() {
  }

  canDelete(user : UserModel, uid){
    if(user.AccountType == "Admin"){
      return true;
    } else if(user.uid == uid){
      return true;
    } else {
      return false;
    }
  }

  delete(key : string){
    console.log("key : ", key);
    this.locationsService.deleteBooking(key)
  }

}
