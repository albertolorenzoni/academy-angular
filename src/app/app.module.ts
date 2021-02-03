import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CourseListComponent } from './course-list/course-list.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentAddComponent } from './student-add/student-add.component';
import { HomeComponent } from './home/home.component';
import { StudentListComponent } from './student-list/student-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarCreatorComponent } from './calendar-creator/calendar-creator.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CourseListComponent,
    StudentDetailComponent,
    StudentAddComponent,
    HomeComponent,
    StudentListComponent,
    CalendarCreatorComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
