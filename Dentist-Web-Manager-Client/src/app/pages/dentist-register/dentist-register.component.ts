import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faCalendar, faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faLock, faWallet, faImage, faCheck, faAddressCard, faInfo, faClock } from '@fortawesome/free-solid-svg-icons'
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { SignupService } from "../../services/signup.service"
import { LoginService } from 'src/app/services/login.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dentist-register',
  templateUrl: './dentist-register.component.html',
  styleUrls: ['./dentist-register.component.scss']
})
export class DentistRegisterComponent implements OnInit {

  faUser = faUser;
  faEnvelope = faEnvelope;
  faCalendar = faCalendar;
  faPhone = faPhone;
  faLock = faLock;
  faWallet = faWallet;
  faImage = faImage;
  faCheck = faCheck;
  faClock = faClock;
  faInfo = faInfo;
  faInstagram = faInstagram;
  faAddressCard = faAddressCard;
  faUserCircle = faUserCircle;

  forma: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private loginService: LoginService,
    private authService: AuthService,
    private http: HttpClient,
    private router: Router) { }


  ngOnInit(): void {
    this.forma = this.formBuilder.group({
      Name: ["", Validators.required],
      Last_name: ["", Validators.required],
      Email: ["", [Validators.required, Validators.email]],
      Phone_number: ["", [Validators.required, Validators.pattern('(\\+?( |-|\\.)?\\d{1,2}( |-|\\.)?)?(\\(?\\d{3}\\)?|\\d{3})( |-|\\.)?(\\d{3}( |-|\\.)?\\d{4})')]],
      Birth_date: ["", Validators.required],
      RFC: ["", [Validators.required, Validators.pattern('^([A-ZÑ&]{3,4}) ?(?:- ?)?(\\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\\d|3[01])) ?(?:- ?)?([A-Z\\d]{2})([A\\d])$')]],
      Password: ["", [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]],
      ConfirmPassword: ["", [Validators.required, Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]],
      image: ["", Validators.required],
      fileSource: ['', Validators.required],
      Specialty: ["", Validators.required],
      Social_media: ["", Validators.required],
      Description: ["", Validators.required]
    }, {
      validators: [this.compararPasswords.bind(this), this.comprobarRFC.bind(this)]
    });
  }
  //Contraseña incorrecta, asegurate de que tu contraseña:  cuenta con al menos 8 caracteres, debe contener una letra mayúscula, 1 letra minúscula y un número - puede contener caracteres especiales

  compararPasswords() {
    if (!this.forma) { return null; }
    const values = this.forma.getRawValue();
    if (values.Password === values.ConfirmPassword) {
      return null;
    } else {
      return { mismatch: true }
    }
  }

  comprobarRFC() {
    if (!this.forma) { return null; }
    if (this.forma.controls.RFC.status === 'VALID' || this.forma.controls.RFC.untouched) {
      return null;
    } else {
      return { errRFC: true }
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.forma.patchValue({
        fileSource: file
      });
    }
  }

  createUser() {
    const values = this.forma.getRawValue();
    if (this.forma.valid) {
      //Subir imagen
      const formData = new FormData();
      formData.append('image', this.forma.get('fileSource').value);
      this.http.post(`http://localhost:3000/image`, formData).toPromise().then((respuesta: any) => {
        console.log(`Imagen subida: ${respuesta.location}`)
        console.log("Llamar a crear usuario")
        this.signupService.dentistSignup({
          Name: values.Name,
          Last_name: values.Last_name,
          Phone_number: values.Phone_number,
          Email: values.Email,
          Birth_date: values.Birth_date,//********Modificar esto por temas de fomrato de la fecha **********************/
          RFC: values.RFC,
          Password: values.Password,
          Specialty: values.Specialty,
          Social_media: values.Social_media,
          Description: values.Description,
          Image: respuesta.location
        }).then((res) => {
          if (res.err) {
            console.log("Correo duplicado")
          } else {
            console.log("Usuario creado correctamente:")
            // console.log(res)

            this.loginService.dentistLogin(values).then((token) => {
              console.log("Inicio de sesión correcto, token:")
              console.log(token)
              this.authService.save(token);
              this.router.navigate(["/Home"])
            }).catch((err) => {
              console.log("Error:")
              console.log(err)
            })
          }
        }).catch((err) => {
          console.log("Error:")
          console.log(err)
        })
      }).catch(err => {
        console.log(err)
      })
    } else {
      console.log("Error en formulario crear usuario")
    }
  }
}
