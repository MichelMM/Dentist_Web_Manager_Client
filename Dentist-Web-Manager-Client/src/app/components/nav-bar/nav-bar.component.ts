import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../../services/auth.service"
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { LoginService } from 'src/app/services/login.service';

import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean = false;
  faBars = faBars
  faFacebook = faFacebook;
  faGoogle = faGoogle;

  form: FormGroup
  
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder, private loginService: LoginService, private socialAuthService: SocialAuthService) {
    this.authService.loginStatus.subscribe(s => {
      console.log("Login status", s)
      this.isLoggedIn = s
    })
  }




  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Email: ["", [Validators.required, Validators.email]],
      Password: ["", Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      console.log("Usuario de google:")
      console.log(user)
      if (user !== null) {
        this.loginService.googleLogin(user).then((token) => {
          console.log("Inicio de sesión correcto, token:")
          console.log(token)
          this.authService.save(token);
          this.router.navigate(["/Home"])
        }).catch((err) => {
          console.log("Error:")
          console.log(err)
        })
      }
    });
  }

  logout() {
    this.authService.clear();
    this.router.navigate(["/Home"])
  }

  click() {
    // console.log("Cerrar navbar")
    document.querySelector("#navbarSupportedContent1").setAttribute("class", "navbar-collapse collapse")
  }

  loginClick(){
    document.getElementById("to-hidden").click();
  }


  login() {
    const values = this.form.getRawValue();
    this.loginService.login(values).then((token) => {
      console.log("Inicio de sesión correcto, token:")
      console.log(token)
      this.authService.save(token);
      this.router.navigate(["/Home"])
    }).catch((err) => {
      console.log("Error:")
      console.log(err)
    })
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
