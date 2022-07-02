import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onSignOut() {
    Swal.fire({
      icon: 'success',
      text: "You are signed out successfully",
    })
    localStorage.removeItem("token")
    localStorage.clear()
    this.route.navigateByUrl("/login")
  }
}