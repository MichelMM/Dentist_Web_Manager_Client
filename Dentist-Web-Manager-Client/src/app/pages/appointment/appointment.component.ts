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
    this.getPatient(localStorage.getItem('token'));
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
    this.apiServ.getToken(e).then(data=>{
      this.apiServ.getPatientbyId(JSON.stringify(data[0].userId)).then(data=>{
        this.patient=data[0];
      }).catch((e)=>{
        console.log(e)
      })
    }).catch((e)=>{
      console.log(e)
    });
  }
  
  sendAppointment(){
    console.log({Dentist_ID:this.doctor,Patient_ID:this.patient._id,Date:this.date,Cause:this.cause});
    this.apiServ.sendAppointment({Dentist_ID:this.doctor,Patient_ID:this.patient._id,Date:this.date,Cause:this.cause}).then(data=>{
      console.log(data);
    }).catch((e)=>{
      console.log(e)
    })
  }

}
