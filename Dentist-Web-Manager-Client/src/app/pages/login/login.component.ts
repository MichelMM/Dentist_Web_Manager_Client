import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  faFacebook = faFacebook;
  faGoogle = faGoogle;

  form:FormGroup

  constructor(
    private formBuilder:FormBuilder, 
    private loginService:LoginService, 
    private authService:AuthService, 
    private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  login(){
    const values = this.form.getRawValue();
    this.loginService.login(values).then((token)=>{
      console.log("Inicio de sesión correcto, token:")
      console.log(token)
      this.authService.save(token);
      this.router.navigate(["/Home"])
    }).catch((err)=>{
      console.log("Error:")
      console.log(err)
    })
  }
}
