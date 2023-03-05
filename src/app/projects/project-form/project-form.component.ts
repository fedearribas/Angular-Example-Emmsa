import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperComponent } from '@progress/kendo-angular-layout';
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

  constructor(private projectService: ProjectService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      mainInformation: this.formBuilder.group({
        code: ['', Validators.required],
        name: ['', Validators.required],
        countryId: [null, Validators.required],
        projectFrom: ['', Validators.required],
        projectTo: ['', Validators.required],
        wtgUnits: ['', Validators.required]
      }),
      additionalInformation: this.formBuilder.group({
        contractScopeId: [null, Validators.required],
        contractStageId: [null, Validators.required],
        productLineId: [null, Validators.required],
        customerTypeId: [null, Validators.required],
        projectManagerId: [null, Validators.required],
        commercialProjectManagerId: [null, Validators.required],
        preliminaryAcceptanceCertificate: [''],
        finalAcceptanceCertificate: ['']
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
    this.currentStepIndex += 1;
    this.steps[0].isValid = this.isFormGroupValid('mainInformation');
    this.steps[1].isValid = this.isFormGroupValid('additionalInformation');
    this.stepper.validateSteps();
  }

  public prev(): void {
    this.currentStepIndex -= 1;
  }

  public submit(): void {

  }

}
