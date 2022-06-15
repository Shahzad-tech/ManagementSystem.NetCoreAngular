import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
// import { LocalStorageRefService } from 'src/app/Services/local-storage-ref.service';
import {NgbActiveModal, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/Services/data.service';
import { JsonpClientBackend } from '@angular/common/http';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  constructor(private _authService:AuthService, private modalService: NgbModal, private _dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  this.getStudents();
  this.getPrograms();
  }

  closeResult = '';
  studentData :any;
  statusColor:any;
  programs:any;
  sortConfig = {
    active : "", 
    direction: ""
  }
  StudentRegistrationForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('',[Validators.required,Validators.minLength(5),Validators.pattern('^[?=a-zA-z1-9-]+$')]),
    UserName: new FormControl('', [Validators.required,Validators.pattern('^[a-zA-z1-9]+$')]),
    UniRollNo: new FormControl('', [Validators.required, Validators.pattern('^[A-Z1-9-]+$')]),
    Name: new FormControl('',[Validators.required,Validators.minLength(5) ,Validators.pattern('^[A-Za-z ]+$')]),
    FatherName: new FormControl('',[Validators.required, Validators.minLength(5),Validators.pattern('^[A-Za-z ]+$')]),
    Address: new FormControl('',[Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$&()\\-`.+,/\" ]*$')]),
    LastProgram: new FormControl('',[Validators.required]),
    CurrentProgram: new FormControl('',[Validators.required]),
    CurrentGPA: new FormControl('',[Validators.required , Validators.pattern('^[1-9.]*$')]),
    Status: new FormControl('',[Validators.required]),
  })

  RegisterStudent(){
    console.log(this.StudentRegistrationForm.value)
    
    this._authService.RegisterStudent(this.StudentRegistrationForm.value).subscribe(
      data=>{
        console.log(data); 
        this.getStudents(); 
      Swal.fire({
        icon: 'success',
        title: 'Student has been added',
        showConfirmButton: false,
        timer: 1000
      })},
      err=>{console.log(err); 
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'There is some error!'
      })
    }
    )
      this.StudentRegistrationForm.reset();
  }
  getStudents(){
    this._dataService.getStudents(this.sortConfig).subscribe(
      data=>{ console.log(data); 
      this.studentData = data;  
      },
      err=>{console.log(err)}
    )
  }

  sortData(event:any){
    console.log(event);
       this.sortConfig = event
       this.getStudents();
  }

  ToEditComponent(val:any){
  console.log("valateditmethod: ", val)
  this.router.navigate(["UpdateStudent"], {queryParams:{data:JSON.stringify(val)}})
  }
  getPrograms(){
    this._dataService.getPrograms().subscribe(
      data=>{this.programs = data},
      err=>{console.log(err)})
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  get StudentEmail(){
    return this.StudentRegistrationForm.get('Email')
  }
  get StudentPassword(){
    return this.StudentRegistrationForm.get('Password')
  }
  get UserName(){
    return this.StudentRegistrationForm.get('UserName')
  }
  get UniRollNo(){
    return this.StudentRegistrationForm.get('UniRollNo')
  }
  get Name(){
    return this.StudentRegistrationForm.get('Name')
  }
  get FatherName(){
    return this.StudentRegistrationForm.get('FatherName')
  }
  get Address(){
    return this.StudentRegistrationForm.get('Addres')
  }
  get LastProgram(){
    return this.StudentRegistrationForm.get('LastProgram')
  }
  get CurrentProgram(){
    return this.StudentRegistrationForm.get('CurrentProgram')
  }
  get CurrentGPA(){
    return this.StudentRegistrationForm.get('CurrentGPA')
  }
  get Status(){
    return this.StudentRegistrationForm.get('Status')
  }
  

}
