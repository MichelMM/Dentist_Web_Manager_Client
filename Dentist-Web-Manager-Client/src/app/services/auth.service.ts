import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginStatus:BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    this.loginStatus.next(this.isLoggedIn());
  }

  save(data) {
    localStorage.setItem('token', data.token);
    this.loginStatus.next(true);
  }

  get() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
  
  clear() {
    localStorage.removeItem('token');
    this.loginStatus.next(false);
  }
}
