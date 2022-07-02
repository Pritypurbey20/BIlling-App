import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup , Validators} from "@angular/forms";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerform = new FormGroup({
    Name : new FormControl("",Validators.required),
    Email: new FormControl("" , Validators.required),
    Address: new FormControl("",Validators.required)

  })
  
  constructor(
    private userService : RestApiService , private route: Router
  ) { }

  ngOnInit(): void {
  }

  newCustomer(){
    console.log(this.customerform.value);
    this.userService.newCustomer(this.customerform.value).subscribe(
      (response : any) => {
        if (response.status == "Success"){
          Swal.fire({
            icon:'success',
            text:response.message
          })
          this.route.navigateByUrl("home/dashboard")
        }
      },
      (error:any)=>{
        console.log(error)
        Swal.fire({
          icon:'error',
          text:error.text
        })
        this.customerform.reset()
      }
    )
  }
}


