import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service"
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLoggedIn:boolean = false;
  faBars=faBars
  constructor(private authService:AuthService, private router:Router) {
    this.authService.loginStatus.subscribe(s=>{
      console.log("Login status",s)
      this.isLoggedIn = s
    })
  }

  ngOnInit(): void {
  }

  logout(){
    this.authService.clear();
    this.router.navigate(["/Home"])
  }

  click(){
    // console.log("Cerrar navbar")
    document.querySelector("#navbarSupportedContent1").setAttribute("class","navbar-collapse collapse")
  }

}
