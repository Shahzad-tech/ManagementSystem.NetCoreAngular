import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';




@NgModule({
  declarations: [
    TeacherDashboardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    NgbModule,
  ]
})
export class TeacherModule { }
