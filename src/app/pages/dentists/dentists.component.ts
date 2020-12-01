import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-dentists',
  templateUrl: './dentists.component.html',
  styleUrls: ['./dentists.component.scss']
})
export class DentistsComponent implements OnInit {

  constructor(private apiServ:ApiService, private spinner: NgxSpinnerService) { }

  dentists:any[]=[]

  ngOnInit(): void {
    this.spinner.show();
    document.querySelectorAll("#listaBotones li:not(#dropdown)").forEach(e=>e.removeAttribute("class"))
    document.querySelector("#gD").setAttribute("class","active")
    this.apiServ.getDentists().then(data=>{
      console.log(data)
      this.dentists=data
      this.spinner.hide();
    }).catch((e)=>{
      console.log(e)
    })
  }

}
