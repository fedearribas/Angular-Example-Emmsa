import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { Subject } from 'rxjs';
import { ProjectService } from '../project.service';
import { ProjectFormComponent } from './project-form.component';

@Injectable({
  providedIn: 'root'
})
export class ProjectFormGuard implements CanDeactivate<ProjectFormComponent> {

  constructor(private projectService: ProjectService) {}

  canDeactivate(component: ProjectFormComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot) {

    if (component.isDirty) {
      this.projectService.toggleProjectFormDiscardChangesDialog(true);
      const discardChangesSubject = new Subject<boolean>();
      component.discardChangesSubject = discardChangesSubject;
      return discardChangesSubject.asObservable();
    }
    return true;
  }
}