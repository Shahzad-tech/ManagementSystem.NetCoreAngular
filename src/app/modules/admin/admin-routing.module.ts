import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentComponent } from './components/student/student.component';
import { LoginComponent } from './components/login/login.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UpdateStudentComponent } from './components/update-student/update-student.component';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { AdminGuard } from 'src/app/Guards/admin.guard';




const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'students', component:StudentComponent,canActivate:[AuthGuard, AdminGuard], data:{role:"Admin"}},
  {path:'teacher', component:TeacherComponent, canActivate:[AuthGuard, AdminGuard ], data:{role:"Admin"}},
  {path:'adminDashboard', component:AdminDashboardComponent, canActivate:[AuthGuard, AdminGuard], data:{role:"Admin"}},
  {path:'UpdateStudent', component: UpdateStudentComponent},
  {path:'', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class adminRoutingModule { }
