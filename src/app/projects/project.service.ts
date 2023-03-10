import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Project, ProjectForGrid } from './project';
import { BehaviorSubject, catchError, forkJoin, map, mergeMap, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Constants } from '../constants';
import { ProjectFilters } from './project-report/project-filters';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projectUrl = `${Constants.apiRoot}/Project/Project`;
  private initialFilters: ProjectFilters = {
    countryId: null,
    codeName: ''
  };
  private filtersSubject = new BehaviorSubject<ProjectFilters>(this.initialFilters);
  filters$ = this.filtersSubject.asObservable();

  private isLoadingGridSubject = new BehaviorSubject<boolean>(false);
  isLoadingGrid$ = this.isLoadingGridSubject.asObservable();

  projects$ = this.filters$.pipe(
    // flat filters and project streams into one observable
    tap(() => this.isLoadingGridSubject.next(true)),
    switchMap(filters => {
      const url = `${this.projectUrl}/GetProjects`;
      let queryParams = new HttpParams();
      if (filters.countryId)
        queryParams = queryParams.append("countryId", filters.countryId);
      if (filters.codeName)
        queryParams = queryParams.append("codeName", filters.codeName);

      return this.http.get<ProjectForGrid[]>(url, { params: queryParams }).pipe(
        // flat project and projectLogs streams into one observable
        switchMap(projects => {
          if (projects.length === 0)
            return of([]);

          // joined project and projectLogs sreams
          return forkJoin(projects.map(project => {
            return this.getProjectLogs(project.Id, project.DetailId).pipe(
              map(logs => {
                project.Logs = logs;
                return project;
              })
            );
          }));

        }),
        tap(() => this.isLoadingGridSubject.next(false))
      )
    }),
    catchError(this.handleError)
  );

  constructor(private http: HttpClient) { }

  updateFilters(filters: ProjectFilters): void {
    this.filtersSubject.next(filters);
  }

  createProject(project: Project) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.projectUrl}/New`;
    return this.http.post<Project>(url, JSON.stringify(project), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  getProject(id: number): Observable<Project> {
    const url = `${this.projectUrl}/GetProject`;
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<Project>(url, { params: queryParams })
      .pipe(
        tap(data => {
          data.ProjectFrom = new Date(data.ProjectFrom);
          data.ProjectTo = new Date(data.ProjectTo);
          if (data.PreliminaryAcceptanceCertificate)
            data.PreliminaryAcceptanceCertificate = new Date(data.PreliminaryAcceptanceCertificate);
          if (data.FinalAcceptanceCertificate)
            data.FinalAcceptanceCertificate = new Date(data.FinalAcceptanceCertificate);
        }),
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
