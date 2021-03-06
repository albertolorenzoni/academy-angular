import { Component, OnInit } from '@angular/core';
import { Student } from '../model/Student';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  pageTitle: string = "Academy Students"
  errorMessage: string = "";
  studentList: Student[] = [];
  

  constructor( private studentService: StudentService ) { }

  ngOnInit(): void {
    this.studentService.getStudentsList().subscribe({
      next: students => {
        this.studentList = students;
      },
      error: err => this.errorMessage = err
    });
  }

}
