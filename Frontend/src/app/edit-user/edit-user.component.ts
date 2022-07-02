import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../services/rest-api.service";
import { Router } from "@angular/router";
import {
  FormControl,
  FormGroup,
} from "@angular/forms";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: any;
  data: any;
  Userform: any;

  constructor( private userServices : RestApiService , private router : Router) { }

  ngOnInit(): void {
    this.userServices.userDetails().subscribe((result:any) => {
      this.user = result
      this.data = this.user
      console.log(this.data)
      this.Userform = new FormGroup({
        Name: new FormControl(`${this.data.Name}`),
        Address: new FormControl(`${this.data.Address}`),
        GST_no: new FormControl(`${this.data.GST_no}`),
        })
    });
  }
  updateUser() {
    console.log(this.Userform.value);
    this.userServices.updateDetails(this.Userform.value).subscribe(
      (response:any)=>{
        console.log(response)
        if (response.status == "Success"){
          Swal.fire({
            icon: "success",
            text: response.message,
          });
          this.router.navigateByUrl("home/update/profile");
        }
      },
      (error: any) => {
        Swal.fire({
          icon: "error",
          text: error.error.text,
        });
        this.Userform.reset();
      }
    )
  }

}
