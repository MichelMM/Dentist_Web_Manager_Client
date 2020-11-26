import { Injectable } from '@angular/core';
import {​​ HttpClient }​​ from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment"


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  getDentists():any{
    return this.http.get(`${environment.API_URL}/dentists`).toPromise()
  }

  getDentist(filter:string):any{
    return this.http.get(`${environment.API_URL}/dentist?filter=`+filter).toPromise()
  }

  getAppointmentFilter(filter:string):any{
    return this.http.get(`${environment.API_URL}/appointment?filter=`+filter).toPromise()
  }

  getAppointments():any{
    return this.http.get(`${environment.API_URL}/appointments`).toPromise()
  }

  sendAppointment(body):any{  
    body = JSON.stringify({data:body})
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    }
    return this.http.post(`${environment.API_URL}/appointment`,body,httpOptions).toPromise()
  }

  getPatients():any{
    return this.http.get(`${environment.API_URL}/patients`).toPromise()
  }

  getPatient(filter:string):any{
    return this.http.get(`${environment.API_URL}/patient?filter=`+filter).toPromise()
  }

  getPatientbyId(filter:string):any{
    return this.http.get(`${environment.API_URL}/patientId?filter=`+filter).toPromise()
  }

  getDentistbyId(filter:string):any{
    return this.http.get(`${environment.API_URL}/patientId?filter=`+filter).toPromise()
  }

  getToken(filter:string):any{
    return this.http.get(`${environment.API_URL}/token?filter=`+filter).toPromise()
  }

  patchPatient(body):any{
    body = JSON.stringify(body)
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    }
    return this.http.patch(`${environment.API_URL}/patient`,body,httpOptions).toPromise()
  }
  
}
