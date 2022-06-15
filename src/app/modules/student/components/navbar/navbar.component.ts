import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/Services/helper.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  userEmail:any;
  UserRole:any;

  constructor(private _localStorageRef : HelperService,private router: Router) { }

  ngOnInit(): void {
    this._localStorageRef.getUserRoleBs().subscribe((data:any)=>{this.UserRole = data})
    this._localStorageRef.getUserEmailBs().subscribe((data:any)=>{this.userEmail = data});
    this._localStorageRef.setUserEmailBs(localStorage.getItem('Email'))
    this._localStorageRef.setUserRoleBs(localStorage.getItem('Role'))  
    
  }

  Logout(){

    this._localStorageRef.logout();
    this.router.navigate(["admin/login"])
  
  }

}
