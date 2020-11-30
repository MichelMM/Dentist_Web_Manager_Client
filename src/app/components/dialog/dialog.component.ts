import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form: FormGroup;
  patient: any = {}
  appointment: any = {}
  constructor(private formBuilder: FormBuilder, private apiServ: ApiService, public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public message: string) { }

  ngOnInit(): void {
    this.appointment = JSON.parse(this.message)
    console.log(this.appointment)
    this.getPatient(this.appointment.Patient_ID)


    this.form = this.formBuilder.group({
      Images: [""],
      Description: ["", Validators.required],
      Payment_type: ["", Validators.required],
      Amount: ["", Validators.required]
    });
  }

  getPatient(e) {
    this.apiServ.getPatientbyId(JSON.stringify(e)).then(data => {
      this.patient = data[0];
      console.log(this.patient)
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

  modificarCita(){
    const cita = this.form.getRawValue()
    console.log(this.form)
  }
}
