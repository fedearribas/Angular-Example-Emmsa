import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Project, ProjectForGrid } from './project';
import { catchError, forkJoin, map, mergeMap, Observable, switchMap, tap, throwError } from 'rxjs';
import { Constants } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl = `${Constants.apiRoot}/Project/Project`;

  constructor(private http: HttpClient) { }

  private getProjects(countryId?: number, codeName?: string): Observable<ProjectForGrid[]> {
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

  private getProjectLogs(projectId: number, detailId: number) {
    const url = `${this.projectUrl}/GetProjectLogs`;
    let queryParams = new HttpParams();
    queryParams = queryParams.append("projectId", projectId);
    queryParams = queryParams.append("detailId", detailId);

    return this.http.get<ProjectForGrid[]>(url, { params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectsWithLogs(countryId?: number, codeName?: string): Observable<ProjectForGrid[]> {
    return this.getProjects(countryId, codeName).pipe(
      mergeMap(projects => {
        const projectObs = projects.map(project => {
          return this.getProjectLogs(project.Id, project.DetailId).pipe(
            map(logs => {
              project.Logs = logs;
              return project;
            })
          );
        });
        return forkJoin(projectObs);
      })
    );
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
