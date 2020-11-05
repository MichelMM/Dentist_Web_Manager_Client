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

  getPatients():any{
    return this.http.get("http://localhost:3000/api/patients").toPromise()
  }
}
