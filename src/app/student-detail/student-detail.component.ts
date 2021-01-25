import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../model/student';
import { StudentService } from '../service/student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
  providers: [DatePipe]
})
export class StudentDetailComponent implements OnInit {

  today = new Date();
  errorMessage: String = "";
  modify: boolean = false;
  studentForm: FormGroup;
  student!: Student;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private location: Location,
    private datepipe: DatePipe
  ) {

  }

  ngOnInit(): void {
    console.log(this.today);
    this.studentService.getStudentById(this.route.snapshot.params.id)
      .subscribe({
        next: data => {
          this.student = data;
          this.studentForm = this.fb.group({
            firstName: [this.student.firstName, [Validators.required]],
            lastName: [this.student.lastName, [Validators.required]],
            email: [this.student.email, [Validators.required, Validators.email]],
            dateOfBirth: [this.datepipe.transform(this.student.dateOfBirth, 'yyy-MM-dd'),
            [Validators.required]],
            education: this.student.education
          });
        },
        error: err => this.errorMessage = err
      });


  }

  enableModify() {
    this.modify = true;
  }

  update() {
    this.studentService.updateStudent(this.route.snapshot.params.id, this.studentForm.value)
    .subscribe({
      next: () => {
        alert("Student updated");
        this.location.back();
      },
      error: err => this.errorMessage = err
    })
  }

  delete() {
    this.studentService.deleteStudent(this.route.snapshot.params.id)
    .subscribe({
      next: () => {
        alert("Student deleted");
        this.location.back();
      },
      error: err => this.errorMessage = err
    })
  }

  confirmDelete() {
    if (confirm('Are you sure you want to delete this student?')) {
      this.delete();
    }
  }
}
