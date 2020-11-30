import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelectorAll("#listaBotones li:not(#dropdown)").forEach(e=>e.removeAttribute("class"))
    document.querySelector("#gC").setAttribute("class","active")
  }

}
