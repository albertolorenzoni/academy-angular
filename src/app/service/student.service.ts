import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators'
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://localhost:8080/api'

  constructor( private httpClient: HttpClient ) { }

  getStudentsList(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(`${this.baseUrl}/student`)
    .pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getStudentById( id: number ): Observable<Student> {
    return this.httpClient.get<Student>(`${this.baseUrl}/student/${id}`)
    .pipe(
      tap(data => console.log('Retrieved student: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addStudent(student: Student): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/student`, student)
    .pipe(
      tap(data => console.log('Added student: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  deleteStudent( id: number ): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/student/${id}`)
    .pipe(
      tap(data => console.log('Retrieved student: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  updateStudent( id: number, student: Student ): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/student/${id}`, student)
    .pipe(
      tap(data => console.log('Retrieved updated student: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
