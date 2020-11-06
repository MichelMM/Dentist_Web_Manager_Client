import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(private apiServ:ApiService) { }
  dentists: any[] = [];
  patient: any = {};

  doctor:string="";
  date:string;
  cause:string;

  ngOnInit(): void {
    this.getDentists();
    this.getPatient(JSON.stringify({}));
  }

  getDentists(){
    this.apiServ.getDentists().then(data=>{
      console.log(data)
      this.dentists=data
    }).catch((e)=>{
      console.log(e);
    })
  }

  getPatient(e){
    this.apiServ.getPatient(e).then(data=>{
      console.log(data)
      this.patient=data[0];
    }).catch((e)=>{
      console.log(e)
    })
  }
  
  sendAppointment(){
    let ID = Number(this.doctor)
    this.apiServ.sendAppointment({Dentist_ID:ID,Patient_ID:this.patient.Patient_ID,Date:this.date,Cause:this.cause}).then(data=>{
      console.log(data);
    }).catch((e)=>{
      console.log(e)
    })
  }

}
