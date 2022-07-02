import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , Validators } from '@angular/forms'   
import { RestApiService } from '../services/rest-api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Loginform = new FormGroup({
    Email: new FormControl('' , Validators.required)
  });
  cookieService: any;

  constructor(private userService:RestApiService , private route:Router , cookieService: CookieService) { }

  ngOnInit(): void {
  }

  LoginUser(){
    console.log(this.Loginform.value);
     this.userService.LoginRegister(this.Loginform.value).subscribe((response:any)=>{
       console.log(response);
       if(response.status=="Success"){
        Swal.fire({
          icon: 'success',
          text: response.message,
        })
        localStorage.setItem("token",response.token)
        this.route.navigateByUrl('/VerifyLoginOTP')
       }
       if(response.status=="failed"){
        Swal.fire({
          icon: 'warning',
          text: response.message,
        })
       this.Loginform.reset()
      }
     },
     (err:any) => {
      Swal.fire({
        icon: 'error',
        text: err.message,
      })
      console.log(err)
      this.Loginform.reset()
    })
  }
  GoogleLogin(){
    let getToken = this.cookieService.get("token")
    localStorage.setItem("token",getToken)
    this.route.navigateByUrl('/VerifyLoginOTP')
  }
}

