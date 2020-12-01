import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IsDentistGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise<any>((resolve, reject) => {
      this.authService.getUserLogged().then(res => {
        if (res[0].type === 1) resolve(true)
        else {
          resolve(false)
          this.router.navigate(["/Home"])
        }
      }).catch(err => {
        console.log(err)
        resolve(false)
        this.router.navigate(["/Home"])
      })
    })
  }

}
