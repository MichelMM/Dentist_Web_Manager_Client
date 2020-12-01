import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';
import { MatDialog } from '@angular/material/dialog'
import { DialogComponent } from 'src/app/components/dialog/dialog.component';

@Component({
  selector: 'app-dentist-appointment',
  templateUrl: './dentist-appointment.component.html',
  styleUrls: ['./dentist-appointment.component.scss']
})
export class DentistAppointmentComponent implements OnInit {

  constructor(private apiServ: ApiService, public dialog: MatDialog) { }

  appointments: any[] = [];
  dentists: any = {};
  patients: any = {};
  appointDentist: any[] = [];
  month: string = "";
  day: string = "";
  selector: string = "2";
  patientS: any = false;
  Name:string = "";
  Last_name:string="";

  ngOnInit(): void {
    this.requestAppointments(localStorage.getItem('token'))
  }

  requestAppointments(e): void {
    const todayDate = new Date()
    let todayString = todayDate.toISOString().slice(0,10)
    //console.log(todayString)
    this.apiServ.getToken(e).then(data => {
      //console.log(data)
      this.apiServ.getDentistbyId(JSON.stringify(data[0].userId)).then(data => {
        this.dentists = data[0];
        this.apiServ.getAppointmentFilter(JSON.stringify({ Dentist_ID: data[0]._id, Date:todayString })).then(data => {
          data.forEach(element => {
            let day = new Date(element.Date)
            day.setTime(day.getTime() + (day.getTimezoneOffset() * 60000))
            element["Date_S"] = day.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })
            let hour = new Date()
            hour.setHours(element.Hour.slice(0, 2), element.Hour.slice(3, 5), 0)
            element["Hour_S"] = hour.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
          });
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


  clickApppointment(e): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: JSON.stringify(this.appointments.find(element => element._id == e)),
      width: '36%'
    }
    );
    dialogRef.afterClosed().subscribe(res => {
      console.log(res)
    })
    console.log(e)
  }


  searchFormat() {
    
    //console.log("selector: " + this.selector + ", patientS: " + this.patientS)
    if (this.patientS) {
      let patientSearchID;
      this.apiServ.getPatient(JSON.stringify({Name:this.Name,Last_name:this.Last_name})).then(data => {
        patientSearchID = data[0];
        //console.log(patientSearchID)
        if (this.selector == "0") {
          this.apiServ.getAppointmentFilter(JSON.stringify({ Dentist_ID: this.dentists._id, Patient_ID:patientSearchID._id, Date: { $regex: this.month }})).then(data => {
            data.forEach(element => {
              let day = new Date(element.Date)
              day.setTime(day.getTime() + (day.getTimezoneOffset() * 60000))
              element["Date_S"] = day.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })
              let hour = new Date()
              hour.setHours(element.Hour.slice(0, 2), element.Hour.slice(3, 5), 0)
              element["Hour_S"] = hour.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
            });
            this.appointments = data
          }).catch((e) => {
            console.log(e)
          })
        } else if (this.selector == "1") {
          this.apiServ.getAppointmentFilter(JSON.stringify({ Dentist_ID: this.dentists._id, Patient_ID:patientSearchID._id, Date: this.day })).then(data => {
            data.forEach(element => {
              let day = new Date(element.Date)
              day.setTime(day.getTime() + (day.getTimezoneOffset() * 60000))
              element["Date_S"] = day.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })
              let hour = new Date()
              hour.setHours(element.Hour.slice(0, 2), element.Hour.slice(3, 5), 0)
              element["Hour_S"] = hour.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
            });
            this.appointments = data
          }).catch((e) => {
            console.log(e)
          })
        } else if (this.selector == "2") {
          this.apiServ.getAppointmentFilter(JSON.stringify({ Dentist_ID: this.dentists._id, Patient_ID:patientSearchID._id})).then(data => {
            data.forEach(element => {
              let day = new Date(element.Date)
              day.setTime(day.getTime() + (day.getTimezoneOffset() * 60000))
              element["Date_S"] = day.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })
              let hour = new Date()
              hour.setHours(element.Hour.slice(0, 2), element.Hour.slice(3, 5), 0)
              element["Hour_S"] = hour.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
            });
            this.appointments = data
          }).catch((e) => {
            console.log(e)
          })
        }




      }).catch((e) => {
        console.log(e)
      })
    } else if (!this.patientS) {
      if (this.selector == "0") {
        this.apiServ.getAppointmentFilter(JSON.stringify({ Dentist_ID: this.dentists._id, Date: { $regex: this.month } })).then(data => {
          data.forEach(element => {
            let day = new Date(element.Date)
            day.setTime(day.getTime() + (day.getTimezoneOffset() * 60000))
            element["Date_S"] = day.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })
            let hour = new Date()
            hour.setHours(element.Hour.slice(0, 2), element.Hour.slice(3, 5), 0)
            element["Hour_S"] = hour.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
          });
          this.appointments = data
        }).catch((e) => {
          console.log(e)
        })
      } else if (this.selector == "1") {
        this.apiServ.getAppointmentFilter(JSON.stringify({ Dentist_ID: this.dentists._id, Date: this.day })).then(data => {
          data.forEach(element => {
            let day = new Date(element.Date)
            day.setTime(day.getTime() + (day.getTimezoneOffset() * 60000))
            element["Date_S"] = day.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })
            let hour = new Date()
            hour.setHours(element.Hour.slice(0, 2), element.Hour.slice(3, 5), 0)
            element["Hour_S"] = hour.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
          });
          this.appointments = data
        }).catch((e) => {
          console.log(e)
        })
      } else if (this.selector == "2") {
        this.apiServ.getAppointmentFilter(JSON.stringify({ Dentist_ID: this.dentists._id, Paid:false})).then(data => {
          data.forEach(element => {
            let day = new Date(element.Date)
            day.setTime(day.getTime() + (day.getTimezoneOffset() * 60000))
            element["Date_S"] = day.toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' })
            let hour = new Date()
            hour.setHours(element.Hour.slice(0, 2), element.Hour.slice(3, 5), 0)
            element["Hour_S"] = hour.toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
          });
          this.appointments = data
        }).catch((e) => {
          console.log(e)
        })
      }
    }

  }





}
