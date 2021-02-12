import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public url:string = environment.backendUrl;

  constructor(private http:HttpClient,private authService:AuthService) { }

  maintainStatus() {
    var userData = JSON.parse(localStorage.getItem('imepress_userdata'));
    if(userData ! = null) {
      this.authService.setLoggedInStatus(true);
    }else{
      this.authService.setLoggedInStatus(false);
    }
  }

  clearUserSession(){
    localStorage.removeItem('imepress_userdata');
    localStorage.removeItem('imepress_token');
  }
}
