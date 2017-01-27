import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs';
import UserModel from "../models/user.model";

@Injectable()
export class AccountsService {
  
  account: FirebaseObjectObservable<UserModel>;
  accounts: FirebaseListObservable<UserModel[]>;
  accountTypeSubject: Subject<String>;
  
  constructor(public af: AngularFire) {
    this.accountTypeSubject = new Subject();

    this.accounts = this.af.database.list('/accounts', {
        query: {
          orderByChild: 'AccountType',
          equalTo: this.accountTypeSubject
        }
      });
  }

  fetchAccounts(accountType){
    let self = this;

    setTimeout(function(){
      self.accountTypeSubject.next(accountType);
    },100);
  }

  fetchAccount(id){
    this.account = this.af.database.object('/accounts/' + id);
  }

  deleteAccount(key: string) {    
    this.accounts.remove(key); 
  }

}
