import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CoursePreferences } from '../model/CoursePreferences';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-calendar-creator',
  templateUrl: './calendar-creator.component.html',
  styleUrls: ['./calendar-creator.component.css']
})
export class CalendarCreatorComponent implements OnInit {


  errorMessage: string = '';
  preferencesForm: FormGroup;
  get daysPrefs(): FormArray {
    return this.preferencesForm.get('daysPrefs') as FormArray;
  }
  constructor( 
    private courseService: CourseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private location: Location
     ) { }

  ngOnInit(): void {
    this.preferencesForm = this.fb.group({
      startDate: [null , [Validators.required]],
      daysPrefs: this.fb.array([this.buildDaysPref()])
    })
  }

  addDaysPrefs(): void {
    this.daysPrefs.push(this.buildDaysPref());
  }

  buildDaysPref(): FormGroup {
    return this.fb.group({
      day: null,
      startTime: [null, Validators.required],
      endTime: [null, Validators.required]
    });
  }

  createCalendar() {
    console.log(this.preferencesForm.value);
    this.courseService.createCourseCalendar(this.route.snapshot.params.id, this.preferencesForm.value)
    .subscribe({
      next: () => {
        alert("Successfully created calendar");
        this.location.back();
      },
      error: err => this.errorMessage = err
    })
  }

}
