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
import { ProjectContractPriceComponent } from './project-detail/project-contract-price/project-contract-price.component';
import { ProjectMainDataComponent } from './project-main-data/project-main-data.component';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectContractPriceFormComponent } from './project-detail/project-contract-price/project-contract-price-form/project-contract-price-form.component';

@NgModule({
  declarations: [
    ProjectReportComponent,
    ProjectFormComponent,
    ProjectMainInformationComponent,
    ProjectAdditionalInformationComponent,
    ProjectContractPriceComponent,
    ProjectMainDataComponent,
    ProjectDetailComponent,
    ProjectContractPriceFormComponent
  ],
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'projects',
        component: ProjectReportComponent
      },
      {
        path: 'new', 
        component: ProjectFormComponent,
        canDeactivate: [ProjectFormGuard]
      },
      {
        path: ':id',
        component: ProjectFormComponent,
        canDeactivate: [ProjectFormGuard]
      },
      {
        path: 'view/:id',
        component: ProjectDetailComponent
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
    DialogsModule,
    NotificationModule
  ]
})
export class ProjectModule { }
