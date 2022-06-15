import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
// import { LocalStorageRefService } from 'src/app/Services/local-storage-ref.service';
import {NgbActiveModal, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from 'src/app/Services/helper.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _authService:AuthService, private router:Router, private _localStorageRef: HelperService,  private modalService: NgbModal)
   { }
  
  response : any
  closeResult = '';
  isLoading = false;

  ngOnInit(): void {
  }
  LoginForm = new FormGroup({
    Email: new FormControl('',[Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required, Validators.minLength(5)])
  })


  get Email(){
    return this.LoginForm.get('Email')
  }
  get Password(){
    return this.LoginForm.get("Password")
  }

  LoginUsers(){
    console.log(this.LoginForm.value)
    this.isLoading = true;
    this._authService.LoginUser(this.LoginForm.value).subscribe(
    
       data=>{
        this.response = data; 
        this.isLoading = false;
        if(this._localStorageRef.getUserRole() == "Student"){
          this.router.navigate(["/student/studentDashboard"])
        }
        else if (this._localStorageRef.getUserRole() == "Teacher") {
          this.router.navigate(["teacher/teacherDashboard"])
        }
        else if (this._localStorageRef.getUserRole() == "Admin"){
          this.router.navigate(["/admin/adminDashboard"])
        }
      },
       err=>{console.log(err); 
        this.isLoading= false ;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'There is some error!',
          footer: 'Please provide valid username or password'
        });

      }
    )
   
  }

}
