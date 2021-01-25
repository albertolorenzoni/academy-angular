import { Component, OnInit } from '@angular/core';
import { Course } from '../model/Course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  pageTitle: string = "Academy Courses"
  errorMessage: string = "";
  courseList: Course[]= [];
  

  constructor( private courseService: CourseService ) { }

  ngOnInit(): void {
    this.courseService.getCoursesList().subscribe({
      next: courses => {
        this.courseList = courses;
      },
      error: err => this.errorMessage = err
    });
  }
}
