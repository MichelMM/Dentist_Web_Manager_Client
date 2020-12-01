import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { AuthService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from "@angular/router"
import { SocketIoService } from 'src/app/services/socket-io.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private socket: SocketIoService,
    private toastr:ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Email: ["", [Validators.required, Validators.email]],
      Password: ["", Validators.required]
    });
  }

  login() {
    this.spinner.show();
    const values = this.form.getRawValue();
    this.loginService.dentistLogin(values).then((token) => {
      console.log("Inicio de sesión correcto, token:")
      console.log(token)
      this.authService.save(token);
      this.spinner.hide();
      this.router.navigate(["/Home"]);
      this.socket.on('NewAppointment', data =>{
        // console.log('DentistID:',data.dentistId);
        this.authService.getUserLogged().then(res => {
          // console.log('user INFO:', res[0].userId);
          if(res[0].userId === data.dentistId){
            this.toastr.success(`Appointment requested for this patient: ${data.patientName} ${data.patientLastName}`);
          }
        }).catch(e => {
          console.log(e);
        });
      });
    }).catch((err) => {
      console.log("Error:")
      console.log(err)
    })
  }

}
