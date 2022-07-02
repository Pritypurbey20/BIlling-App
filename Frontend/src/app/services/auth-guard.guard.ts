import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private Authguardservice: AuthenticationService, private router: Router) {}  

  canActivate() : boolean {
    if(this.Authguardservice.gettoken()){
      return true 
    }
    else{
      this.router.navigateByUrl("/login")
      return false
    }
  }
}
