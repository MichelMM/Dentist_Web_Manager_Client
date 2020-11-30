import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faCalendar, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faPhone, faLock, faWallet } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ApiService } from './../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  faUser = faUser;
  faEnvelope = faEnvelope;
  faCalendar = faCalendar;
  faPhone = faPhone;
  faLock = faLock;
  faWallet = faWallet;
  faUserCircle = faUserCircle;

  patient: any = {vacio:true};

  forma: FormGroup;
  constructor(private formBuilder: FormBuilder, private apiServ: ApiService, private router: Router) { }

  ngOnInit(): void {

    this.getPatient(localStorage.getItem('token'));

    this.forma = this.formBuilder.group({
      Name: ["", Validators.required],
      Last_name: ["", Validators.required],
      Phone_number: ["", [Validators.required, Validators.pattern('(\\+?( |-|\\.)?\\d{1,2}( |-|\\.)?)?(\\(?\\d{3}\\)?|\\d{3})( |-|\\.)?(\\d{3}( |-|\\.)?\\d{4})')]],
      Birth_date: ["", Validators.required],
      RFC: ["", [Validators.required, Validators.pattern('^([A-ZÑ&]{3,4}) ?(?:- ?)?(\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])) ?(?:- ?)?([A-Z\\d]{2})([A\\d])$')]],
      Password: ["", [Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]],
      ConfirmPassword: ["", [Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]]
    }, {
      validators: [this.compararPasswords.bind(this), this.comprobarRFC.bind(this)]
    });
  }

  patchPatient() {
    const values = this.forma.getRawValue();
    let body = {
      filter: {
        Email: this.patient.Email
      },
      data: {
        $set: {
          Name: values.Name,
          Last_name: values.Last_name,
          Phone_number: values.Phone_number,
          Birth_date: values.Birth_date,
          RFC: values.RFC
        }
      },
      many: false
    };
    if (values.Password != "") {
      body.data['Password'] = values.Password;
    }
    this.apiServ.patchPatient(body).then(data => {
      this.router.navigate(["/Home"])
      console.log(data);
    }).catch((e) => {
      console.log(e);
    })
  }

  getPatient(e) {
    this.apiServ.getToken(e).then(data => {
      this.apiServ.getPatientbyId(JSON.stringify(data[0].userId)).then(data => {
        this.patient = data[0];
        console.log(this.patient)

        this.forma = this.formBuilder.group({
          Name: [this.patient.Name, Validators.required],
          Last_name: [this.patient.Last_name, Validators.required],
          Phone_number: [this.patient.Phone_number, [Validators.required, Validators.pattern('(\\+?( |-|\\.)?\\d{1,2}( |-|\\.)?)?(\\(?\\d{3}\\)?|\\d{3})( |-|\\.)?(\\d{3}( |-|\\.)?\\d{4})')]],
          Birth_date: [this.patient.Birth_date, Validators.required],
          RFC: [this.patient.RFC, [Validators.required, Validators.pattern('^([A-ZÑ&]{3,4}) ?(?:- ?)?(\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])) ?(?:- ?)?([A-Z\\d]{2})([A\\d])$')]],
          Password: ["", [Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]],
          ConfirmPassword: ["", [Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]]
        });
      }).catch((e) => {
        console.log(e)
      })
    }).catch((e) => {
      console.log(e)
    });
  }

  compararPasswords() {
    if (!this.forma) { return null; }
    const values = this.forma.getRawValue();
    if (values.Password === values.ConfirmPassword) {
      return null;
    } else {
      return { mismatch: true }
    }
  }

  comprobarRFC() {
    if (!this.forma) { return null; }
    if (this.forma.controls.RFC.status === 'VALID' || this.forma.controls.RFC.untouched) {
      return null;
    } else {
      return { errRFC: true }
    }
  }
}
