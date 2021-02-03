import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../model/Student';
import { StudentService } from '../service/student.service';
import {Location} from '@angular/common'

@Component({
  selector: 'app-student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.css']
})
export class StudentAddComponent implements OnInit {

  pageTitle: string = "Insert student details" 
  errorMessage: string = "";
  studentForm: FormGroup;

  constructor( 
    private fb: FormBuilder, 
    private studentService: StudentService,
    private location: Location ) { 
      this.studentForm = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dateOfBirth: [null, [Validators.required]],
        education: ['']
      })
    }

  ngOnInit(): void {
    
  }

  save(): void {
    this.studentService.addStudent(this.studentForm.value).subscribe({
      next: () => {
        alert("Successfully added new student");
        this.location.back();
      },
      error: err => this.errorMessage = err
    })
  }

}
