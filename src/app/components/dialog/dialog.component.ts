import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ApiService } from './../../services/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AuthService } from "../../services/auth.service"
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  patient: any = {}
  appointment: any = {}
  correctPatch: any = {}
  userType: boolean = true;
  constructor(
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private http: HttpClient, 
    private formBuilder: FormBuilder, 
    private apiServ: ApiService, 
    public dialogRef: MatDialogRef<DialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public message: string) {
    this.authService.userType.subscribe(s => {
      console.log("User type: ", s)
      this.userType = s
    })
   }

  ngOnInit(): void {
    this.appointment = JSON.parse(this.message)
    this.getPatient(this.appointment.Patient_ID)


    this.form = this.formBuilder.group({
      Images: [""],
      Description: ["", Validators.required],
      Payment_type: ["", Validators.required],
      Amount: ["", Validators.required],
      fileSource: ['', Validators.required]
    });
  }

  getPatient(e) {
    this.apiServ.getPatientbyId(JSON.stringify(e),localStorage.token).then(data => {
      this.patient = data[0];
    }).catch((e) => {
      console.log(e)
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.patchValue({
        fileSource: file
      });
    }

  }


  onCancel(): void {
    this.dialogRef.close();
  }

  modificarCita() {
    this.spinner.show();
    const cita = this.form.getRawValue()
    const formData = new FormData();
    formData.append('image', this.form.get('fileSource').value);

    this.http.post(`${environment.API_URL_NO_API}/image`, formData).toPromise().then((respuesta: any) => {
      //console.log(`Imagen subida: ${respuesta.location}`)
      //console.log("Llamar a crear usuario")
      let body = {
        filter: this.appointment._id,
        data: {
          $set: {
            Paid: true,
            Images: respuesta.location,
            Description: cita.Description,
            Payment_type: cita.Payment_type,
            Amount: cita.Amount
          }
        },
        many: false
      }
      //console.log(body)

      this.apiServ.patchAppointment(body,localStorage.token).then(data => {
        this.correctPatch = data;
        this.spinner.hide();
        window.location.reload();
      }).catch((e) => {
        console.log(e)
      })

    }).catch(err => {
      console.log(err)
    })

  }
}
