import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss']
})

export class MyAppointmentsComponent implements OnInit {

  constructor(private apiServ: ApiService) { }

  appointments: any[] = []
  dentists: any[] = []
  patients: any = {}
  appointDentist: any[] = []
  month: string = "";


  ngOnInit(): void {
    this.requestAppointments(localStorage.getItem('token'))

  }

  changeMonth() {
    this.appointDentist.splice(0,this.appointDentist.length);
    console.log(this.appointDentist)
    this.appointments.forEach(appointment => {
      let obj = {}
      if (appointment.Date.substr(0, 7) == this.month) {
        obj["Cause"] = appointment.Cause;
        obj["Date"] = appointment.Date;
        obj["Description"] = appointment.Description;

        obj["Dentist"] = this.dentists.find(dentist => dentist._id == appointment.Dentist_ID).Name
        obj["DentistLN"] = this.dentists.find(dentist => dentist._id == appointment.Dentist_ID).Last_name
        obj["Patient"] = this.patients.Name
        obj["PatientLN"] = this.patients.Last_name
        this.appointDentist.push(obj)
      }
      
    });
  }

  requestAppointments(e): void {
    this.apiServ.getToken(e).then(data => {
      this.apiServ.getPatientbyId(JSON.stringify(data[0].userId)).then(data => {
        this.patients = data[0];
        this.apiServ.getAppointmentFilter(JSON.stringify({ Patient_ID: data[0]._id })).then(data => {
          this.appointments = data
          this.apiServ.getDentists().then(data => {
            this.dentists = data;
            this.getAppointDentist()
          }).catch((e) => {
            console.log(e)
          })
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




  getAppointDentist(): void {
    this.appointments.forEach(appointment => {
      let obj = {}
      obj["Cause"] = appointment.Cause;
      obj["Date"] = appointment.Date;
      obj["Hour"] = appointment.Hour;
      obj["Description"] = appointment.Description;

      obj["Dentist"] = this.dentists.find(dentist => dentist._id == appointment.Dentist_ID).Name
      obj["DentistLN"] = this.dentists.find(dentist => dentist._id == appointment.Dentist_ID).Last_name
      obj["Patient"] = this.patients.Name
      obj["PatientLN"] = this.patients.Last_name
      this.appointDentist.push(obj)
    });
  }
}


