import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SignupService } from './../services/signup.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileCompletedGuard implements CanActivate {
  constructor(private signupService: SignupService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let flag = this.signupService.isProfileCompleted()
    // console.log("localhost")
    // console.log(flag)
    if(!flag)this.router.navigate(["/user/profile"])
    return flag
  }

}
