import { AuthProviders, AuthMethods } from 'angularfire2';

// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyBMHrwDMgM9Tz5E5KU4VigYhgyk4qCy43s',
  authDomain: 'ng2realtimeparkingbooking.firebaseio.com',
  databaseURL: 'https://ng2realtimeparkingbooking.firebaseio.com/',
  storageBucket: '<your-storage-bucket>',
  messagingSenderId: '<your-messaging-sender-id>'
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};