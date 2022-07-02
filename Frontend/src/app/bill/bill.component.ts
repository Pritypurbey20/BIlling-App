import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';
import { FormControl, FormGroup , Validators} from "@angular/forms";
import { ActivatedRoute , Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {

  Billform = new FormGroup({
    Item: new FormControl("",Validators.required),
    Shipping_charge: new FormControl("",Validators.required),
    Discount: new FormControl("",Validators.required),
    Total : new FormControl("", Validators.required)

  })
  customer_id: any;

  constructor(private route:ActivatedRoute, private router : Router , private userService: RestApiService) { }


  ngOnInit(): void {
  }
  
  newBill(){
    
    this.customer_id = this.route.snapshot.paramMap.get('id');    
    this.Billform.value.customer_id = this.customer_id;

    console.log(this.Billform.value);

    this.userService.newBill(this.Billform.value).subscribe(
      (response:any) =>{
        if (response.status == "Success"){
          
          Swal.fire({
            icon:"success",
            text:response.message
          })
          this.router.navigateByUrl("home/dashboard")
        }
      },
      (error:any)=>{
        Swal.fire({
          icon:'error',
          text:error.text
        })
        this.Billform.reset()
      }
    )
  }
}


