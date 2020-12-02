import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../../services/api.service';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from 'src/app/components/dialog/dialog.component';


@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss']
})

export class MyAppointmentsComponent implements OnInit {

  constructor(private apiServ: ApiService, private spinner: NgxSpinnerService, public dialog: MatDialog) { }

  appointments: any[] = []
  dentists: any[] = []
  patients: any = {}
  appointDentist: any[] = []
  month: string = "";


  ngOnInit(): void {
    this.requestAppointments(localStorage.getItem('token'))

  }

  changeMonth() {
    this.appointDentist.splice(0, this.appointDentist.length);
    //console.log(this.appointDentist)
    this.appointments.forEach(appointment => {

      let obj = {}
      if (appointment.Date.substr(0, 7) == this.month) {
        obj["_id"] = appointment._id;
        obj["Paid"] = appointment.Paid;
        obj["Cause"] = appointment.Cause;
        obj["Date"] = appointment.Date;
        obj["Hour"] = appointment.Hour;
        obj["Description"] = appointment.Description;
        obj["Amount"] = appointment.Amount;
        let day = new Date(appointment.Date)
        day.setTime(day.getTime() + (day.getTimezoneOffset() * 60000))
        obj["Date_S"] = day.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })
        let hour = new Date()
        if(appointment.Hour.length == 7){
          hour.setHours(appointment.Hour.slice(0, 1), appointment.Hour.slice(2, 4), 0)
        }else{
          hour.setHours(appointment.Hour.slice(0, 2), appointment.Hour.slice(3, 5), 0)
        }
        obj["Hour_S"] = hour.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        obj["Dentist"] = this.dentists.find(dentist => dentist._id == appointment.Dentist_ID).Name
        obj["DentistLN"] = this.dentists.find(dentist => dentist._id == appointment.Dentist_ID).Last_name
        obj["Patient"] = this.patients.Name
        obj["PatientLN"] = this.patients.Last_name
        this.appointDentist.push(obj)
      }

    });
  }

  requestAppointments(e): void {
    this.spinner.show();
    this.apiServ.getToken(e).then(data => {
      this.apiServ.getPatientbyId(JSON.stringify(data[0].userId)).then(data => {
        this.patients = data[0];
        this.apiServ.getAppointmentFilter(JSON.stringify({ Patient_ID: data[0]._id })).then(data => {
          this.appointments = data
          this.apiServ.getDentists().then(data => {
            this.dentists = data;
            //console.log(this.dentists)
            this.getAppointDentist()
            this.spinner.hide();
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
      obj["_id"] = appointment._id;
      obj["Paid"] = appointment.Paid;
      obj["Cause"] = appointment.Cause;
      obj["Date"] = appointment.Date;
      obj["Hour"] = appointment.Hour;
      obj["Description"] = appointment.Description;
      obj["Amount"] = appointment.Amount;
      let day = new Date(appointment.Date)
      day.setTime(day.getTime() + (day.getTimezoneOffset() * 60000))
      obj["Date_S"] = day.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })
      let hour = new Date()
      if(appointment.Hour.length == 7){
        hour.setHours(appointment.Hour.slice(0, 1), appointment.Hour.slice(2, 4), 0)
      }else{
        hour.setHours(appointment.Hour.slice(0, 2), appointment.Hour.slice(3, 5), 0)
      }
      
     
      obj["Hour_S"] = hour.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
      obj["Dentist"] = this.dentists.find(dentist => dentist._id == appointment.Dentist_ID).Name
      obj["DentistLN"] = this.dentists.find(dentist => dentist._id == appointment.Dentist_ID).Last_name
      obj["Patient"] = this.patients.Name
      obj["PatientLN"] = this.patients.Last_name
      this.appointDentist.push(obj)
    });
    //console.log(this.appointDentist)
  }

  clickApppointment(e): void {
    if (e.Paid) {
      //console.log(e)
      const dialogRef = this.dialog.open(DialogComponent, {
        data: JSON.stringify(this.appointments.find(element => element._id == e._id)),
        width: '36%'
      }
      );
      dialogRef.afterClosed().subscribe(res => {
        console.log(res)
      })
      //console.log(e)
    }
  }

  deleteAppointment(e){
    console.log(typeof e)
    this.spinner.show();
    this.apiServ.deleteAppointment(JSON.stringify(e)).then(data=>{
      console.log(data)
      this.spinner.hide()
      window.location.reload();
    }).catch(e=>{
      console.log(e)
    })
    console.log(e)
  }

}


