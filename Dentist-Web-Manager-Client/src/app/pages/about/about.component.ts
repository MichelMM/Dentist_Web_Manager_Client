import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    document.querySelectorAll("#listaBotones li:not(#dropdown)").forEach(e=>e.removeAttribute("class"))
    document.querySelector("#gA").setAttribute("class","active")
  }

}
