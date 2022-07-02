import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../services/rest-api.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  allCustomers: any;
  data: any;
  _id: any;
  p: number = 1;
  totalRecords: any;
  nameSearch:string = ""


  public lineChartData: ChartDataset[] = [
    { data: [], label: 'Series A' },
  ];
  public lineChartLabels: any[] = [];
  public lineChartOptions:ChartOptions = {
    responsive: true,
  };
  public lineChartColors: any[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];


  constructor(private userServices: RestApiService, private router: Router) { }


  ngOnInit(): void {
    this.getAllCustomer()
    this.graphData()
  }

  onPageChange(num: any) {

    this.p = num;
    console.log(this.p)
    this.getAllCustomer()

  }

  getAllCustomer() {
    this.userServices.allCustomers(this.p).subscribe((result: any) => {
      this.allCustomers = result.data
      this.data = this.allCustomers
      this.totalRecords = result.count
      console.log(result)
    })
  }

  customersBills(data: any) {
    console.log(data);
    this.router.navigateByUrl(`home/allbills/${data._id}`)

  }
  createBill(data: any) {
    this.router.navigateByUrl(`home/bill/${data._id}`)
  }

  DeleteBill(id: any) {
    console.log(id)
    this.userServices.delete(id).subscribe(
      (response: any) => {
        if (response.status == "Success") {
          Swal.fire({
            icon: "success",
            text: response.message
          })
        }
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          text: error.text
        })
      }
    )
    this.ngOnInit()
  }
  graphData(){
    try{
      let dateObj = new Date()
      this.userServices.graphData().subscribe((response:any) => {
        if (response.status == "success"){
          console.log(response)
          response.data.forEach((obj:any)=>{
            dateObj = new Date(obj.billCreatedTime)
            this.lineChartLabels.push(dateObj.toDateString())
            this.lineChartData[0].data.push(obj.Total)
          })
          console.log(this.lineChartLabels,this.lineChartData)
        }
      })
      
    } catch (error:any){
      Swal.fire({
        icon: 'error',
        text: error.text
      })
    }
  }

 
}




