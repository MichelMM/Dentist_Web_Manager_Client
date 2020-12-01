import { Injectable } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { resolve } from 'dns';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { SocketIoService } from './socket-io.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);
  userType: BehaviorSubject<boolean> = new BehaviorSubject(false);
  loginStatusGoogle: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoggedGoogle: any;

  constructor(private socialAuthService: SocialAuthService, private socket: SocketIoService, private api: ApiService) {
    this.loginStatus.next(this.isLoggedIn());

    this.socialAuthService.authState.subscribe(valor => {
      this.isLoggedGoogle = valor
    })
  }
  getUserType() {
    //0->True->Patient
    //1->False->Dentist
    return new Promise<any>((resolve, reject) => {
      this.getUserLogged().then(res => {
        if (res[0].type === 0) resolve(true)
        else resolve(false)
      }).catch(err => {
        console.log(err)
      })
    })
  }

  save(data) {
    localStorage.setItem('token', data.token);
    this.loginStatus.next(true);
    this.socket.connect();

    this.getUserType().then(res=>{
      this.userType.next(res)
    }).catch(err=>{
      console.log(err)
    })
  }

  get() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  clear() {
    localStorage.removeItem('token');
    if (this.isLoggedGoogle) this.socialAuthService.signOut();
    this.loginStatus.next(false);
    this.socket.disconnect();
  }

  getUserLogged() {
    const token = localStorage.getItem("token")
    return this.api.getToken(token)
  }
}
