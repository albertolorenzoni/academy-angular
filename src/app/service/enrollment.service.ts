import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators'
import { Enrollment } from '../model/Enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private baseUrl = 'http://localhost:8080/api'

  constructor( private httpClient: HttpClient ) { }

  addEnrollment(enrollment: Enrollment): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/enrollment`, enrollment)
    .pipe(
      tap(data => console.log('Added enrollment: ' + JSON.stringify(data))),
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
