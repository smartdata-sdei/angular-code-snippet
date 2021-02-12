import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url: string = environment.backendUrl;
  public loggedIn = new ReplaySubject<boolean>();
  public userData = new ReplaySubject<any>();
  constructor(private http: HttpClient) { }

  loginCustomer(data) {
    return this.http.post(this.url + '/api/customer/login', data);
  }

  userRegistration(data) {
    return this.http.post(this.url + '/api/customer/signup', data);
  }

  /**
  * Getter method for getting Logged In status
  */
  getLoggedInStatus() {
    return this.loggedIn.asObservable();
  }

  /**
  * Setter method to set Logged In status
  * @param value
  */
  setLoggedInStatus(value) {
    this.loggedIn.next(value);
  }

  /**
  * Getter method for getting Logged In status
  */
 getUserData() {
  return this.userData.asObservable();
}

/**
* Setter method to set Logged In status
* @param value
*/
seUserData(value) {
  this.loggedIn.next(value);
}
}
