import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../services/api.service';

@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss']
})
export class MyAppointmentsComponent implements OnInit {

  constructor(private apiServ:ApiService) { }

  appointments:any[]=[]
  dentists:any[]=[]
  patients:any[]=[]

  appointDentist:any[]=[]


  ngOnInit(): void {
    this.requestAppointments()
    
  }

  requestAppointments(): void{ //PROFE AIUDAAAAAAAAAA
    this.apiServ.getAppointments().then(data=>{
      this.appointments = data
      console.log("Just appointments")
      console.log(this.appointments)
      this.apiServ.getDentists().then(data=>{
        this.dentists = data
        // console.log(data)
        this.apiServ.getPatients().then(data=>{
          this.patients = data
          // console.log(data)
          this.getAppointDentist()
        }).catch(e=>{
          console.error(e)
        })
      }).catch(e=>{
        console.error(e)
      })
    }).catch(e=>{
      console.error(e)
    })
  }

  getAppointDentist(): void{
    console.log("entrando")
    console.log(this.appointments)
    this.appointments.forEach(appointment => {
      let obj={}
      obj["Cause"]=appointment.Cause;
      obj["Date"]=appointment.Date;
      obj["Description"]=appointment.Description;

      obj["Dentist"]=this.dentists.find(dentist=>dentist.Dentist_ID==appointment.Dentist_ID).Name
      obj["DentistLN"]=this.dentists.find(dentist=>dentist.Dentist_ID==appointment.Dentist_ID).Last_name
      obj["Patient"]=this.patients.find(patient=>patient.Patient_ID==appointment.Patient_ID).Name
      obj["PatientLN"]=this.patients.find(patient=>patient.Patient_ID==appointment.Patient_ID).Last_name
      this.appointDentist.push(obj)
    });
    console.log(this.appointDentist)
  }
}
