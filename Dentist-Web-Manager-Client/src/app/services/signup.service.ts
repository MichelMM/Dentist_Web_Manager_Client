import { Injectable } from '@angular/core';
import {​​ HttpClient }​​ from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient) { }

  signup(body:any):Promise<any>{
    body = JSON.stringify({data:body})
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    }
    return this.http.post(`${environment.API_URL}/signup`,body,httpOptions).toPromise();
  }
  
  dentistSignup(body:any):Promise<any>{
    body = JSON.stringify({data:body})
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type':  'application/json'})
    }
    return this.http.post(`${environment.API_URL}/dentistSignup`,body,httpOptions).toPromise();
  }

}
