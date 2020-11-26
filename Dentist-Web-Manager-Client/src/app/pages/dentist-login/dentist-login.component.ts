import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-dentist-login',
  templateUrl: './dentist-login.component.html',
  styleUrls: ['./dentist-login.component.scss']
})
export class DentistLoginComponent implements OnInit {
  form: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Email: ["", [Validators.required, Validators.email]],
      Password: ["", Validators.required]
    });
  }

  login() {
    const values = this.form.getRawValue();
    this.loginService.dentistLogin(values).then((token) => {
      console.log("Inicio de sesión correcto, token:")
      console.log(token)
      this.authService.save(token);
      this.router.navigate(["/Home"])
    }).catch((err) => {
      console.log("Error:")
      console.log(err)
    })
  }

}
