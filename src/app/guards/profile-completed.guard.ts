import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SignupService } from './../services/signup.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileCompletedGuard implements CanActivate {
  constructor(private signupService: SignupService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<any>((resolve, reject) => {
      this.signupService.isProfileCompleted().then(res => {
        console.log("localhost")
        console.log(res)
        if (!res) this.router.navigate(["/user/profile"])
        resolve(res)
      }).catch(err => {
        console.log(err)
        resolve(false)
      })
    })
  }

}
