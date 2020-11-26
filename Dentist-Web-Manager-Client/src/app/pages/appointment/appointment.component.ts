import { Component, OnInit } from '@angular/core';
import { SocketIoService } from 'src/app/services/socket-io.service';
import { ApiService } from './../../services/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(
    private apiServ: ApiService,
    private socket: SocketIoService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService
  ) { }
  dentists: any[] = [];
  patient: any = {};
  hour: string[] = [];
  appointments: any[] = [];

  form: FormGroup;

  ngOnInit(): void {
    let today = new Date().toString().slice(0, 16)
    let newDate = new Date(today)
    newDate.setDate(newDate.getDate() + 1);

    document.getElementsByName("somedate")[0].setAttribute('min', newDate.toISOString().split('T')[0]);

    this.getDentists();
    this.getPatient(localStorage.getItem('token'));
    this.form = this.formBuilder.group({
      Dentist_ID: ["", Validators.required],
      Date: ["", Validators.required],
      Cause: ["", [Validators.required]],
      Hour: ["", [Validators.required, , Validators.pattern('^(24:00:00)|((([0-1]?\\d)|(2[0-3])):[0-5]\\d:[0-5]\\d)$')]]
    }, {
      validators: []
    });
  }

  changeHour() {
    let values = this.form.getRawValue();
    const todayDate = new Date()
    let appDate = new Date(values.Date + "T00:00:00.000-06:00");
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    if (values.Date != "" && values.Dentist_ID != "") {
      if (todayDate < appDate) {
        let temp = this.dentists.find(dentist => dentist._id == values.Dentist_ID);
        temp = temp.Schedule
        this.apiServ.getAppointmentFilter(JSON.stringify({ Date: values.Date, Dentist_ID: values.Dentist_ID })).then(data => {
          this.appointments = data;
          temp = temp[weekday[appDate.getDay()]]
          for (var i = 0; i < this.appointments.length; i++) {
            temp = temp.filter(element => element != this.appointments[i].Hour)
          }
          this.hour = temp
        }).catch((e) => {
          console.log(e)
        })
      }
    }

  }

  getDentists() {
    this.apiServ.getDentists().then(data => {
      this.dentists = data
    }).catch((e) => {
      console.log(e);
    })
  }


  getPatient(e) {
    this.apiServ.getToken(e).then(data => {
      this.apiServ.getPatientbyId(JSON.stringify(data[0].userId)).then(data => {
        this.patient = data[0];
      }).catch((e) => {
        console.log(e)
      })
    }).catch((e) => {
      console.log(e)
    });
  }

  sendAppointment() {
    const values = this.form.getRawValue();
    let obj = {
      Dentist_ID: values.Dentist_ID,
      Patient_ID: this.patient._id,
      Cause: values.Cause,
      Date: values.Date,
      Hour: values.Hour,
      Paid: false,
      images: [],
      Description:"",
      Payment_type:"",
      Amount:0
    }
    this.apiServ.sendAppointment(obj).then(data => {
      console.log('Emitiendo appointment con socket...');
      this.socket.emit('appointmentDone', {
        url: 'localhost://4200/user/myAppointment',
        patientName: this.patient.Name,
        patientLastName: this.patient.Last_name
      });
      this.toastr.success(`Appointment generated! You can ckeck your appointments <a href="localhost://4200/user/myAppointments" target="_blank">here</a>` ,'Appointment done!', {
      enableHtml: true
      });
    }).catch((e) => {
      console.log(e)
    })
  }

}
