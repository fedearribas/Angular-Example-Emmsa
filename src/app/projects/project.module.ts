import { NgModule } from '@angular/core';
import { PrimengModule } from '../shared/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { ProjectReportComponent } from './project-report/project-report.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProjectReportComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: 'projects', component: ProjectReportComponent }
    ]),
    SharedModule,
    PrimengModule
  ]
})
export class ProjectModule { }
