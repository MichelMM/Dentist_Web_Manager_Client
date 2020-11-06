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
    
    this.apiServ.sendAppointment({}).then(data=>{
      console.log(data);
    }).catch((e)=>{
      console.log(e)
    })
  }

}
