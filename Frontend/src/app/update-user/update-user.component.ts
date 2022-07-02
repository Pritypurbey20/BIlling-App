import { Component, OnInit } from "@angular/core";
import { RestApiService } from "../services/rest-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-update-user",
  templateUrl: "./update-user.component.html",
  styleUrls: ["./update-user.component.css"],
})
export class UpdateUserComponent implements OnInit {
  user: any;
  data: any;
  Userform:any;
  
  constructor(
    private userServices: RestApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.userServices.userDetails().subscribe((result:any) => {
      this.user = result
      this.data = this.user
      console.log(this.data)
    });
  }
}
