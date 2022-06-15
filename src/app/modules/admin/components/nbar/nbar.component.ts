import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
// import { LocalStorageRefService } from 'src/app/Services/local-storage-ref.service';
import { HelperService } from 'src/app/Services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nbar',
  templateUrl: './nbar.component.html',
  styleUrls: ['./nbar.component.css']
})
export class NbarComponent implements OnInit {

  userEmail:any;
  UserRole:any;
  
  constructor(private AuthService: AuthService, private router: Router, private _localStorageRef : HelperService) { }

  ngOnInit(): void {
  
    this._localStorageRef.getUserRoleBs().subscribe((data:any)=>{this.UserRole = data})
    this._localStorageRef.getUserEmailBs().subscribe((data:any)=>{this.userEmail = data});
    this._localStorageRef.setUserEmailBs(localStorage.getItem('Email'))
    this._localStorageRef.setUserRoleBs(localStorage.getItem('Role'))  
    
  }

  Logout(){

    this._localStorageRef.logout();
    this.router.navigate(["login"])
  
  }
 

}
