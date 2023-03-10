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
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectMainInformationComponent } from './project-form/project-main-information/project-main-information.component';
import { ProjectAdditionalInformationComponent } from './project-form/project-additional-information/project-additional-information.component';
import { IndicatorsModule } from "@progress/kendo-angular-indicators";
import { ProjectFormGuard } from './project-form/project-form.guard';
import { DialogsModule } from "@progress/kendo-angular-dialog";

@NgModule({
  declarations: [
    ProjectReportComponent,
    ProjectFormComponent,
    ProjectMainInformationComponent,
    ProjectAdditionalInformationComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'projects',
        component: ProjectReportComponent
      },
      {
        path: 'projects/new', 
        component: ProjectFormComponent,
        canDeactivate: [ProjectFormGuard]
      },
      {
        path: 'projects/:id',
        component: ProjectFormComponent,
        canDeactivate: [ProjectFormGuard]
      }
    ]),
    SharedModule,
    LayoutModule,
    IconModule,
    ButtonModule,
    InputsModule,
    LabelModule,
    DropDownsModule,
    GridModule,
    DateInputsModule,
    IndicatorsModule,
    DialogsModule
  ]
})
export class ProjectModule { }
