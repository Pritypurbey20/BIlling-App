import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  gettoken(){  
    return !!localStorage.getItem("token");  
    }  


}



