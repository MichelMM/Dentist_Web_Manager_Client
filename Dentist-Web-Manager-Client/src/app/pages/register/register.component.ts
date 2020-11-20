import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faCalendar, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import {faPhone, faLock, faWallet} from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { SignupService } from "../../services/signup.service"

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit { 
  faUser = faUser;
  faEnvelope = faEnvelope;
  faCalendar = faCalendar;
  faPhone = faPhone;
  faLock = faLock;
  faWallet = faWallet;
  faUserCircle = faUserCircle;

  forma:FormGroup;
  constructor(private formBuilder:FormBuilder, private signupService:SignupService) { }

  
  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      Name:["",Validators.required],
      Last_name:["",Validators.required],
      Email:["",[Validators.required, Validators.email]],
      Phone_number:["",[Validators.required, Validators.pattern('(\\+?( |-|\\.)?\\d{1,2}( |-|\\.)?)?(\\(?\\d{3}\\)?|\\d{3})( |-|\\.)?(\\d{3}( |-|\\.)?\\d{4})')]],
      Birth_date:["",Validators.required],
      RFC:["",[Validators.required, Validators.pattern('^([A-ZÑ&]{3,4}) ?(?:- ?)?(\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])) ?(?:- ?)?([A-Z\\d]{2})([A\\d])$')]],
      Password:["",[Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]],
      ConfirmPassword:["",[Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]]
    }, {
      validators: [this.compararPasswords.bind(this),this.comprobarRFC.bind(this)]
    });
  }
//Contraseña incorrecta, asegurate de que tu contraseña:  cuenta con al menos 8 caracteres, debe contener una letra mayúscula, 1 letra minúscula y un número - puede contener caracteres especiales

compararPasswords() {
  if(!this.forma) { return null; }
  const values = this.forma.getRawValue();
  if(values.Password === values.ConfirmPassword) {
    return null;
  } else {
    return { mismatch: true }
  }
}

comprobarRFC() {
  if(!this.forma) { return null; }
  if(this.forma.controls.RFC.status === 'VALID' || this.forma.controls.RFC.untouched) {
    return null;
  } else {
    return { errRFC: true }
  }
}

  createUser(){
    const values = this.forma.getRawValue();
    if(this.forma.valid){
      console.log("Llamar a crear usuario")
      this.signupService.signup({
        Name: values.Name,
        Last_name: values.Last_name,
        Phone_number: values.Phone_number,
        Email: values.Email,
        Birth_date: values.Birth_date,//********Modificar esto por temas de fomrato de la fecha **********************/
        RFC: values.RFC,
        Password: values.Password
      }).then((res)=>{
        console.log("Usuario creado correctamente:")
        console.log(res)
      }).catch((err)=>{
        console.log("Error:")
        console.log(err)
      })
    }else{
      console.log("Error en formulario crear usuario")
    }
  }
}
