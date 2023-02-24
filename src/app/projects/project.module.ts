import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProjectReportComponent } from './project-report/project-report.component';
import { RouterModule } from '@angular/router';
import { ProjectFormComponent } from './project-form/project-form.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { IconModule } from '@progress/kendo-angular-icons';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

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
    LayoutModule,
    IconModule,
    ButtonModule,
    InputsModule,
    LabelModule,
    DropDownsModule,
    GridModule
  ]
})
export class ProjectModule { }
