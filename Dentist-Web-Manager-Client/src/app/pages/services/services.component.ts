import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  constructor(private apiServ:ApiService) { }

  ngOnInit(): void {
    this.apiServ.getDentist(JSON.stringify({Dentist_ID:1})).then(data=>{
      console.log(data)
    }).catch((e)=>{
      console.log(e)
    })
  }

}
