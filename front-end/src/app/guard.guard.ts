import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {EMPTY, Observable, switchMap} from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import {AppService} from "./app.service";
import {Admin} from "./admin";
import { Location } from '@angular/common';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  admin: Admin | undefined
  addForm: any = {};

  constructor(
    private router: Router,
    private appService: AppService,
    private location: Location
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = this.appService.role;
    const token = localStorage.getItem('token');
    if (token) {
        const decodedToken: any = jwt_decode(token);
        const rol = decodedToken.role;
      if ( route.data['roles'].includes(rol)){
        return true
      }
      // return this.router.navigate([this.appService.currentRoute])
      return this.router.parseUrl('/');
    }


    // else if (route.data['roles'].includes(role) == 'admin'){
    //   !this.location.back()
    //   return false
    // }
    else {
      console.log('here false'+this.location.back())
      // this.appService.storeRoute(this.router.url);
      this.location.back()
      // this.router.navigate([this.appService.currentRoute]);
      return false
    }



  }
}
