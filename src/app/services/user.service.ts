import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { Store } from '@ngrx/store';

import UserModel from '../models/user.model'
import { ActionType } from '../app.store';

@Injectable()
export class UserService {

  public UserObservable: ReplaySubject<UserModel> = new ReplaySubject(1);
  public UserFirebaseObservable : FirebaseObjectObservable<UserModel>;

  constructor(public af: AngularFire, private store: Store<UserModel>) { }

  firebaseIsLogin(){

    let _self = this;
    this.af.auth.subscribe(data => {

      if(data && data.uid){
        console.log(data.uid);
        _self.UserFirebaseObservable = _self.af.database.object('/accounts/' + data.uid);

        _self.UserFirebaseObservable.subscribe(data => {
          //_self.UserObservable.next(data);
          _self.store.dispatch({ type: ActionType.User, payload : data });
        });        
      } else {

        //_self.UserObservable.next(null);
        _self.store.dispatch({ type: ActionType.User, payload : null });
      }

    })
  }

  firebaseLogout(){
    let _self = this;
    this.af.auth.logout();
    //_self.UserObservable.next(null);
    _self.store.dispatch({ type: ActionType.User, payload : null });
  }

  firebaseCreateUser(userObj){ 

    let _self = this

    this.af.auth.createUser({
      email : userObj.Email,
      password : userObj.Password
    }).then(function(data){
      console.log("data", data);

      userObj.uid = data.uid;

      _self.UserFirebaseObservable = _self.af.database.object('/accounts/' + data.uid);
      _self.UserFirebaseObservable.set(userObj);
      //_self.UserObservable.next(userObj);
      _self.store.dispatch({ type: ActionType.User, payload : userObj });


    }).catch(function(err){
      console.log("err", err)
    });
    
  }

  firebaseLogin(userObj){ 

    let _self = this

    this.af.auth.login({
      email : userObj.Email,
      password : userObj.Password
    }).then(function(data){
      console.log("data", data);

      userObj.uid = data.uid;

      _self.UserFirebaseObservable = _self.af.database.object('/accounts/' + data.uid);
      _self.UserFirebaseObservable.subscribe(data => {

        if(userObj.Email == "admin@gmail.com" && !data.uid){
            
            data = {
              uid : userObj.uid,
              Email : userObj.Email,
              AccountType : "Admin",
              Gender : "Male",
              FirstName : "Admin",
              LastName : "Admin",
              Company : ""
            }
            
            _self.UserFirebaseObservable.set(data);
        } 
        
        _self.store.dispatch({ type: ActionType.User, payload : data });
        //_self.UserObservable.next(data);
      })
      

    }).catch(function(err){
      console.log("err", err)
    });
    
  }

}
