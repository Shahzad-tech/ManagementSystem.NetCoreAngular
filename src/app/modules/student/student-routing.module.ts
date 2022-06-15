import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../admin/components/login/login.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { StudentGuard } from 'src/app/Guards/student.guard';



const routes: Routes = [
  // {path:'login', component:LoginComponent},
  {path:'studentDashboard', component:StudentDashboardComponent, canActivate:[AuthGuard, StudentGuard], data:{role:"Admin,Student"}} 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class StudentRoutingModule { }
