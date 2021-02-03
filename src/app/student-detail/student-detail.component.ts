import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Student } from '../model/Student';
import { StudentService } from '../service/student.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Course } from '../model/Course';
import { CourseService } from '../service/course.service';
import { Enrollment } from '../model/Enrollment';
import { EnrollmentService } from '../service/enrollment.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css'],
  providers: [DatePipe]
})
export class StudentDetailComponent implements OnInit {

  errorMessage: String = "";
  modify: boolean = false;
  studentForm: FormGroup;
  student!: Student;
  courses: Course[];
  enrollment = new Enrollment;
  enrollmentCourseId = new FormControl; 

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private route: ActivatedRoute,
    private location: Location,
    private datepipe: DatePipe,
    private modalService: NgbModal
  ) {

  }

  ngOnInit(): void {
    this.studentService.getStudentById(this.route.snapshot.params.id)
      .subscribe({
        next: data => {
          this.student = data;
          this.studentForm = this.fb.group({
            firstName: [this.student.firstName, [Validators.required]],
            lastName: [this.student.lastName, [Validators.required]],
            email: [this.student.email, [Validators.required, Validators.email]],
            dateOfBirth: [this.datepipe.transform(this.student.dateOfBirth, 'dd-MM-yyy'),
            [Validators.required]],
            education: this.student.education,
          });
        },
        error: err => this.errorMessage = err
      });

      this.courseService.getCoursesList()
        .subscribe({
          next: courses => {
            this.courses = courses;
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
        this.modify = false;
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

  openEnrollmentModal(content: any) {
    this.modalService.open(content, { size: 'l' });
  }

  enroll() {
    this.enrollment.studentId = this.student.id;
    this.enrollment.courseId = this.enrollmentCourseId.value;
    this.enrollmentService.addEnrollment(this.enrollment).subscribe({
      next: () => {
        //alert("Successfully enrolled student");
        this.ngOnInit();
      },
      error: err => this.errorMessage = err
    });
  }
}
