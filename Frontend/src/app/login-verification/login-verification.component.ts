import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../services/rest-api.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-login-verification",
  templateUrl: "./login-verification.component.html",
  styleUrls: ["./login-verification.component.css"],
})
export class LoginVerificationComponent implements OnInit {
  LoginOTPform = new FormGroup({
    otp: new FormControl(""),
  });

  constructor(private LoginOTP: RestApiService, private route: Router) {}

  ngOnInit(): void {}

  verifyLoggedinUser() {
    this.LoginOTP.verifyLoggedinUser(this.LoginOTPform.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status == "Success") {
          Swal.fire({
            icon: "success",
            text: response.message,
          });
          this.route.navigateByUrl("home/dashboard");
        }
        if ((response.status == "Failed") || (response.status == "Max") || (response.status == "Blocked")) {
          Swal.fire({
            icon: "warning",
            text: response.message,
          });
          this.LoginOTPform.reset();
        }
      },
      (err: any) => {
        Swal.fire({
          icon: "error",
          text: err.error.text,
        });
        this.LoginOTPform.reset();
      }
    );
  }
}
