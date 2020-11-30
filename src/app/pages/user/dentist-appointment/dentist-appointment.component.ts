import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-dentist-appointment',
  templateUrl: './dentist-appointment.component.html',
  styleUrls: ['./dentist-appointment.component.scss']
})
@Component({
  selector: 'dialog-content-example',
  templateUrl: 'dialog-content-example.html',
})

export class DentistAppointmentComponent implements OnInit {

  constructor(private apiServ: ApiService) { }

  appointments: any[] = []
  dentists: any = {}
  patients: any = {}
  appointDentist: any[] = []
  month: string = ""

  ngOnInit(): void {
    this.requestAppointments(localStorage.getItem('token'))
  }

  requestAppointments(e): void {
    this.apiServ.getToken(e).then(data => {
      this.apiServ.getDentistbyId(JSON.stringify(data[0].userId)).then(data => {
        this.dentists = data[0];
        this.apiServ.getAppointmentFilter(JSON.stringify({ Dentist_ID: data[0]._id, Paid:false})).then(data => {
          this.appointments = data
        }).catch((e) => {
          console.log(e)
        })
      }).catch((e) => {
        console.log(e)
      })
    }).catch((e) => {
      console.log(e)
    });
  }


  clickApppointment(e):void{

  }

}
