import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectReportComponent } from './project-report/project-report.component';
import { RouterModule } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [
    ProjectReportComponent,
    ProjectFormComponent
  ],
  imports: [
    RouterModule.forChild([
      {
        path: 'projects',
        component: ProjectReportComponent
      },
      {
        path: 'projects/new', 
        component: ProjectFormComponent
      },
      {
        path: 'projects/:id',
        component: ProjectFormComponent
      }
    ]),
    SharedModule,
    GridModule
  ]
})
export class ProjectModule { }
