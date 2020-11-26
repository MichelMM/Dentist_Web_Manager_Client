import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelectorAll("#listaBotones li:not(#dropdown)").forEach(e=>e.removeAttribute("class"))
    document.querySelector("#gF").setAttribute("class","active")
  }

}
