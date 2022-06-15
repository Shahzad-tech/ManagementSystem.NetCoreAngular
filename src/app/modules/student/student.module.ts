import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StudentRoutingModule } from './student-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    StudentDashboardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    NgbModule
  ]
})
export class StudentModule { }
