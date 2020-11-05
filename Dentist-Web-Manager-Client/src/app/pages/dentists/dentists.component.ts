import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-dentists',
  templateUrl: './dentists.component.html',
  styleUrls: ['./dentists.component.scss']
})
export class DentistsComponent implements OnInit {

  constructor(private apiServ:ApiService) { }

  dentists:any[]=[]

  ngOnInit(): void {
    this.apiServ.getDentists().then(data=>{
      console.log(data)
      this.dentists=data
    }).catch((e)=>{
      console.log(e)
    })
  }

}
