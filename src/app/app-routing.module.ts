import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { HomeComponent } from './home/home.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { CalendarCreatorComponent } from './calendar-creator/calendar-creator.component';
import { CalendarComponent } from './calendar/calendar.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'students/add', component: StudentAddComponent},
  { path: 'students/:id', component: StudentDetailComponent},
  { path: 'courses/:id/calendartool', component: CalendarCreatorComponent},
  { path: 'courses/:id/calendar', component: CalendarComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
