import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'teacher',
    loadChildren:()=>import('./modules/teacher/teacher.module').then(m=>m.TeacherModule)
  },
  {
    path:'student',
    loadChildren:()=>import('./modules/student/student.module').then(m=>m.StudentModule)
  },
  {
    path: '',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
