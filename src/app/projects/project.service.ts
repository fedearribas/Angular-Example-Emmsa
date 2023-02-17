import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Project, ProjectForGrid } from './project';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl = 'http://localhost:36133/Project/Project';

  constructor(private http: HttpClient) { }

  getProjects(countryId: number, codeName: string): Observable<ProjectForGrid[]> {
    const url = `${this.projectUrl}/GetProjects`;
    let queryParams = new HttpParams();

    if (countryId)
      queryParams = queryParams.append("countryId", countryId);
    if (codeName)
      queryParams = queryParams.append("codeName", codeName);

    return this.http.get<ProjectForGrid[]>(url, { params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
