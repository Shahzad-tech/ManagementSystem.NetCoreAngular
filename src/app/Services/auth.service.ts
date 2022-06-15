import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HelperService } from './helper.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.baseUrl
  // baseUrl = "https://localhost:7070"
  constructor(private http:HttpClient, private _localStorage: HelperService ) {}

  LoginUser(data:any){
    let url = this.baseUrl+`/User/Login`
    return this.http.post(url, data, {responseType:'text'}).pipe(
      map((response:any)=>{
        if(response){  
          this._localStorage.setlocalStorage(response)              
        }
      })
      )
  }

  RegisterStudent(data:any){
    let url = this.baseUrl+`/User/Register/Student`
    return this.http.post(url,data)
  }
}
