import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http:HttpClient) { }

  userRegister:any = (data:any) => this.http.post(url+"user" , data)

  LoginRegister:any = (data:any) => this.http.post(url+"login" , data)

  verifyLoggedinUser : any = (data:any) => this.http.post(url+"api/verify/loginOTP",data , {headers:new HttpHeaders(
    {'content-type':'application/json',Authorization:`${localStorage.getItem("token")}`}
  )})

  newCustomer : any = (data:any) => this.http.post(url+"api/customer",data , {headers:new HttpHeaders(
    {'content-type':'application/json',Authorization:`${localStorage.getItem("token")}`}
  )})

  newBill : any = ( data:any) => this.http.post(url+"api/bill" , data, {headers:new HttpHeaders(
    {'content-type':'application/json',Authorization:`${localStorage.getItem("token")}`}
  )})
  
  allCustomers : any = (page:any) => this.http.get(url+`api/allcustomers?page=${page}`, {headers:new HttpHeaders(
    {'content-type':'application/json',Authorization:`${localStorage.getItem("token")}`}
  )})

  allBills : any = (params:any) => this.http.get(url+"api/allbills", {headers:new HttpHeaders(
    {'content-type':'application/json',Authorization:`${localStorage.getItem("token")}`}
  ),params:params})

  userDetails : any = () => this.http.get(url + "api/details" , {headers:new HttpHeaders(
    {'content-type':'application/json',Authorization:`${localStorage.getItem("token")}`}
  )})

  updateDetails : any = (data:any) => this.http.post(url + "api/update" , data ,{headers:new HttpHeaders(
    {'content-type':'application/json',Authorization:`${localStorage.getItem("token")}`}
  )})

  delete : any = (id:any) => this.http.delete(url + `api/delete/${id}` , {headers:new HttpHeaders(
    {'content-type':'application/json',Authorization:`${localStorage.getItem("token")}`}
  )})

  graphData : any = (data:any) => this.http.get(url + `api/dashboard?${data}` , {headers:new HttpHeaders(
    {'content-type':'application/json',Authorization:`${localStorage.getItem("token")}`}
  )})
  
}











