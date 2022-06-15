import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {tap} from "rxjs/operators"

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(localStorage.getItem('id_token')!=null){
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('id_token'))
        .set('Content-Type', 'application/json')
        .set('responseType', 'json')
      })
      return next.handle(clonedReq).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) { //instance of is a binary opertor used to check if an object is of given type or not
              console.log(event)
            }
          }
          ,
          err=>{
            if(err.status == 401){
              localStorage.removeItem('id_token');
              this.router.navigateByUrl('/login');
            }
          }
        )
      )
    }
    else 
      return next.handle(req.clone())
  }

}

