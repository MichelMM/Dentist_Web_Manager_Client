import { Injectable } from '@angular/core';
import {​​ HttpClient }​​ from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getDentists():any{
    return this.http.get("http://localhost:3000/api/dentists").toPromise()
  }

  getDentist(filter:string):any{
    return this.http.get("http://localhost:3000/api/dentist?filter="+filter).toPromise()
  }

  getAppointments():any{
    return this.http.get("http://localhost:3000/api/appointments").toPromise()
  }

  sendAppointment(body):any{
    return this.http.post("http://localhost:3000/api/appointment",body).toPromise()
  }

  getPatients():any{
    return this.http.get("http://localhost:3000/api/patients").toPromise()
  }

  getPatient(filter:string):any{
    return this.http.get("http://localhost:3000/api/patient?filter="+filter).toPromise()
  }

  
}
