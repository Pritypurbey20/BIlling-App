import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RestApiService } from '../services/rest-api.service';
import { HttpParams } from '@angular/common/http';


@Component({
  selector: 'app-allbills',
  templateUrl: './allbills.component.html',
  styleUrls: ['./allbills.component.css']
})
export class AllbillsComponent implements OnInit {

  customer_id:any
  allBills: any;
  data: any;
  constructor(private route:ActivatedRoute, private router : Router , private userService: RestApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.customer_id = params['id'];
    })
    this.billList()
  }

  billList(){
    let params = new HttpParams();
    params = params.append('customer_id',this.customer_id )
    console.log(params);
    
    this.userService.allBills(params).subscribe((result:any)=>{
      this.allBills = result
      this.data = this.allBills
      console.log(result)
    })
  }
}



