import { Injectable } from '@angular/core';
import {​​ HttpClient }​​ from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment"
import { AuthService } from "./auth.service"
import { ApiService } from 'Dentist-Web-Manager-Client/src/app/services/api.service';
import { element } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http:HttpClient, private authService:AuthService, private apiService:ApiService) { }

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

  isProfileCompleted():any{
    let flag=true
    this.authService.getUserLogged().then(data=>{
      this.apiService.getPatientbyId(JSON.stringify(data[0].userId)).then(data=>{
        console.log(data[0])
        const profileProps = ["Name","Last_name","Email","Phone_number","Birth_date","RFC"]
        profileProps.forEach(element=>{
          // console.log(`Training ${element}: ${!Object.keys(data[0]).includes(element)}`)
          if(!Object.keys(data[0]).includes(element)){
            // console.log("tick")
            flag = false
          }
        })
        return flag
      }).catch(err=>{
        console.log(err)
        return false
      })
    }).catch(err=>{
      console.log(err)
      return false
    })
  }
}