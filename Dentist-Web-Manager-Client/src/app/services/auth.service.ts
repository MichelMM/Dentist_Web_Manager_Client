import { Injectable } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { BehaviorSubject } from 'rxjs';
import { SocketIoService } from './socket-io.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private socialAuthService:SocialAuthService, private socket:SocketIoService) {
    this.loginStatus.next(this.isLoggedIn());
  }

  save(data) {
    localStorage.setItem('token', data.token);
    this.loginStatus.next(true);
    this.socket.connect();
  }

  get() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  
  clear() {
    localStorage.removeItem('token');
    this.socialAuthService.signOut();
    this.loginStatus.next(false);
    this.socket.disconnect();
  }
}
