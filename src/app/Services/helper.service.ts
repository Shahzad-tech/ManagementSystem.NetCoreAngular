import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  
  Role = new BehaviorSubject('');
  Email = new BehaviorSubject('');

 getDecodedAccessToken(token:string):any{
   try{
     return jwt_decode(token);
   }catch(Error){
     return null
   }

 }

 setlocalStorage(data:any){
   const tokenInfo = this.getDecodedAccessToken(data);
   localStorage.setItem("id_token",data)
   // this.Role = tokenInfo.role
    this.Email.next(tokenInfo.UserEmail);
    this.Role.next(tokenInfo.role);
    localStorage.setItem("Role", tokenInfo.role)
    localStorage.setItem("Email", tokenInfo.UserEmail)
 }

 getUserRoleBs(){
   return this.Role
 }
  setUserRoleBs(latestValue:any){
    return this.Role.next(latestValue) 
  }
  setUserEmailBs(latestValue:any){
   return this.Email.next(latestValue)
  }

 getUserEmailBs(){
   return this.Email
 }


 getUserRole(){
   return localStorage.getItem("Role")
 }
 
 getUserEmail(){
   return localStorage.getItem("Email")
 }

 logout(){
   localStorage.clear();
 }

}
