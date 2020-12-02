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

  getAppointmentFilter(filter:string,token:string):any{
    return this.http.get(`${environment.API_URL}/appointment?token=${token}&filter=`+filter).toPromise()
  }

  getAppointments(token:string):any{
    return this.http.get(`${environment.API_URL}/appointments?token=${token}`).toPromise()
  }

  sendAppointment(body,token:string):any{  
    body = JSON.stringify({data:body})
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    }
    return this.http.post(`${environment.API_URL}/appointment?token=${token}`,body,httpOptions).toPromise()
  }

  getPatients(token:string):any{
    return this.http.get(`${environment.API_URL}/patients?token=${token}`).toPromise()
  }

  getPatient(filter:string,token:string):any{
    return this.http.get(`${environment.API_URL}/patient?token=${token}&filter=`+filter).toPromise()
  }

  getPatientbyId(filter:string,token:string):any{
    return this.http.get(`${environment.API_URL}/patientId?token=${token}&filter=`+filter).toPromise()
  }

  getDentistbyId(filter:string):any{
    return this.http.get(`${environment.API_URL}/dentistId?filter=`+filter).toPromise()
  }

  getToken(filter:string):any{
    return this.http.get(`${environment.API_URL}/token?filter=`+filter).toPromise()
  }

  patchPatient(body,token:string):any{
    body = JSON.stringify(body)
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    }
    return this.http.patch(`${environment.API_URL}/patient?token=${token}`,body,httpOptions).toPromise()
  }

  patchAppointment(body,token:string):any{
    body = JSON.stringify(body)
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    }
    return this.http.patch(`${environment.API_URL}/appointment?token=${token}`,body,httpOptions).toPromise()
  }

  deleteAppointment(filter:string,token:string):any{
    return this.http.delete(`${environment.API_URL}/appointment?token=${token}&filter=`+filter).toPromise()
  }

  
}
