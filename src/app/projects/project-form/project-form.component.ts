import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  @ViewChild('stepper', { static: true })
  public stepper!: StepperComponent;
  projectForm!: FormGroup;
  currentStepIndex = 0;
  isLinear = true;
  steps!: any[];
  errorMessage!: string;

  constructor(private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit(): void {

    const projectFrom = new Date();
    const projectTo = new Date(new Date(projectFrom).setMonth(projectFrom.getMonth() + 1));

    this.projectForm = this.formBuilder.group({
      mainInformation: this.formBuilder.group({
        Code: ['', Validators.required],
        Name: ['', Validators.required],
        CountryId: [null, Validators.required],
        ProjectFrom: [projectFrom, Validators.required],
        ProjectTo: [projectTo, Validators.required],
        WTGUnits: ['', Validators.required]
      }),
      additionalInformation: this.formBuilder.group({
        ContractScopeId: [null, Validators.required],
        ContractStageId: [null, Validators.required],
        ProductLineId: [null, Validators.required],
        CustomerTypeId: [null, Validators.required],
        ProjectManagerId: [null, Validators.required],
        CommercialProjectManagerId: [null, Validators.required],
        PreliminaryAcceptanceCertificate: [''],
        FinalAcceptanceCertificate: ['']
      })
    });

    this.steps = [
      { label: "Main information" },
      { label: "Additional information" },
      { label: "Contract price", optional: true },
      { label: "Attachements", optional: true }
    ];
  }

  isFormGroupValid(name: string): boolean {
    const formGroup = this.getFromGroup(name);
    return formGroup.valid;
  }

  getFromGroup(name: string): FormGroup {
    const group = this.projectForm.controls[name] as FormGroup;
    return group;
  }

  public next(): void {

    this.steps[0].isValid = this.isFormGroupValid('mainInformation');
    this.steps[1].isValid = this.isFormGroupValid('additionalInformation');

    let currentFormGroup = this.getFormGroupByIndex();
    currentFormGroup?.markAllAsTouched();

    this.currentStepIndex += 1;
    this.stepper.validateSteps();

  }

  private getFormGroupByIndex() {
    let formGroup;
    if (this.currentStepIndex === 0)
      formGroup = this.getFromGroup('mainInformation');
    if (this.currentStepIndex === 1)
      formGroup = this.getFromGroup('additionalInformation');

    return formGroup;
  }

  public prev(): void {
    this.currentStepIndex -= 1;
  }

  public submit() {
    if (!this.projectForm.valid) {
      this.projectForm.markAllAsTouched();
      this.stepper.validateSteps();

      this.notificationService.show({
        content: "The form has some invalid data. Please check",
        cssClass: "button-notification",
        animation: { type: "slide", duration: 400 },
        position: { horizontal: "center", vertical: "bottom" },
        type: { style: "error", icon: true },
        closable: true
      });
    }
    else {
      const project = { ...this.projectForm?.get('mainInformation')?.value, ...this.projectForm?.get('additionalInformation')?.value };
      this.projectService.createProject(project)
        .subscribe({
          next: () => this.onSaveComplete(),
          error: err => this.errorMessage = err
        });
    }
  }

  onSaveComplete(): void {
    this.projectForm.reset();
    this.notificationService.show({
      content: "Success!",
      cssClass: "button-notification",
      animation: { type: "slide", duration: 400 },
      position: { horizontal: "center", vertical: "bottom" },
      type: { style: "success", icon: true },
      closable: true
    });
    this.router.navigate(['/projects']);
  }

}
