import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../service/app.service';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService,private appService: AppService, private route: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var userData = JSON.parse(localStorage.getItem('imepress_userdata'));
    var token = localStorage.getItem('imepress_token');
    if (userData == null || userData == "" || token == null || token == "") {
      this.appService.clearUserSession();
      this.authService.setLoggedInStatus(false);
      this.route.navigate(['/'])
    } else {
      if (userData.user_role_id == '3') {
        this.authService.setLoggedInStatus(true);
        return true;
      } else {
        console.log('Un Authorized User');
        this.appService.clearUserSession();
        this.authService.setLoggedInStatus(false);
        this.route.navigate(['/']);
      }
    }
  }
}


