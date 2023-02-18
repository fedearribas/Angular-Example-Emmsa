import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProjectForGrid } from '../project';
import { ProjectService } from '../project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectReportResolver implements Resolve<ProjectForGrid[]> {

  constructor(private projectService: ProjectService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectForGrid[]> {
    return this.projectService.getProjects();
  }
}
