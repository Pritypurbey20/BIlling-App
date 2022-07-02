import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../services/rest-api.service";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: RestApiService, private route: Router) {}

  registerform = new FormGroup({
    Name: new FormControl("", Validators.required),
    Email: new FormControl("", Validators.required),
    Address: new FormControl("", Validators.required),
    GST_no: new FormControl("", Validators.required),
  });

  ngOnInit(): void {}

  registerUser() {
    console.log(this.registerform.value);
    this.userService.userRegister(this.registerform.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status == "Success") {
          Swal.fire({
            icon: "success",
            text: response.message,
          });
          this.route.navigateByUrl("/login");
        }
        if (response.status == "Failed"){
          Swal.fire({
            icon:"warning",
            text : response.message
          })
          this.registerform.reset();
        }
      },
      (error: any) => {
        console.log(error)
        Swal.fire({
          icon: "error",
          text: error.error.text,
        });
        this.registerform.reset();
      }
    );
  }
}
