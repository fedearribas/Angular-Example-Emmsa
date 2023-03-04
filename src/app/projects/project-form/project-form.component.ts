import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {

  projectForm!: FormGroup;

  currentStepIndex = 0;
  isLinear = true;
  steps = [
    { label: "Main information" },
    { label: "Additional information" },
    { label: "Contract price" },
    { label: "Attachements", optional: true }
  ];

  constructor(private projectService: ProjectService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      mainInformation: this.formBuilder.group({
        code: ['', Validators.required],
        name: ['', Validators.required],
        countryId: [{}, Validators.required],
        projectFrom: ['', Validators.required],
        projectTo: ['', Validators.required],
        wtgUnits: ['', Validators.required]
      })
    });
  }

  getFromGroup(name: string): FormGroup {
    const group = this.projectForm.controls[name] as FormGroup;
    return group;
  }

  public next(): void {
    this.currentStepIndex += 1;
  }

  public prev(): void {
    this.currentStepIndex -= 1;
  }

  public submit(): void {

  }

}
