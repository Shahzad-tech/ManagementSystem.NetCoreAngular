import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
// import { LocalStorageRefService } from '../Services/local-storage-ref.service';
import { HelperService } from '../Services/helper.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherGuard implements CanActivate {
  
  // roles:any
   constructor(private _localStorageRef : HelperService) { 
  //   this._localStorageRef.Role.subscribe((role: any)=>{this.roles = role})
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return route.data['role'].includes(this._localStorageRef.getUserRole())
  }
  
}
