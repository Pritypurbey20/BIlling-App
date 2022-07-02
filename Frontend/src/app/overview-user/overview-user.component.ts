import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../services/rest-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-overview-user',
  templateUrl: './overview-user.component.html',
  styleUrls: ['./overview-user.component.css']
})
export class OverviewUserComponent implements OnInit {
  user: any;
  data: any;

  constructor(private userServices : RestApiService , private router: Router) { }

  ngOnInit(): void {
    this.userServices.userDetails().subscribe((result:any) => {
      this.user = result
      this.data = this.user
      console.log(this.data)
    })
  }

}
