import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NbarComponent } from './components/nbar/nbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSortModule } from '@angular/material/sort';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
import { BrowserModule } from '@angular/platform-browser';
// import { TokenInterceptorService } from './Services/token-interceptor.service';
import { TokenInterceptorService } from 'src/app/Services/token-interceptor.service';
import { LoginComponent } from './components/login/login.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { adminRoutingModule } from './admin-routing.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
     LoginComponent,
     TeacherComponent,
     StudentComponent,
     AdminDashboardComponent,
     NbarComponent,
     UpdateStudentComponent,
  ],
  imports: [
    // BrowserModule,
    // AppRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatSliderModule,
    MatSortModule,
    CommonModule, 
    RouterModule,
    // Router,
    adminRoutingModule
  ],
})
export class AdminModule { }
