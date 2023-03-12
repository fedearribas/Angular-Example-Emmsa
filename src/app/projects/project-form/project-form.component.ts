import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { ProjectService } from '../project.service';
import { Project } from '../project';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: true })
  stepper!: StepperComponent;
  projectForm!: FormGroup;
  currentStepIndex = 0;
  isLinear = true;
  steps!: any[];
  errorMessage!: string;
  title!: string;
  isEditMode = false;
  project!: Project;
  showDeleteProjectDialog = false;
  id: number = 0;

  discardChangesDialogOpened$ = this.projectService.projectFormDiscardChangesDialogOpened$;
  discardChangesSubject!: Subject<boolean>;
  disableDeleteButton$!: Observable<boolean>;

  projectSub!: Subscription;
  createProjectSub!: Subscription;
  updateProjectSub!: Subscription;
  deleteProjectSub!: Subscription;

  get isDirty(): boolean {
    return this.projectForm.touched;
  }

  constructor(private projectService: ProjectService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.title = 'New project';

    this.steps = [
      { label: "Main information" },
      { label: "Additional information" }
    ];

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
        FinalAcceptanceCertificate: [''],
        ValidFrom: ['']
      })
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id && this.id > 0) {
      this.projectSub = this.projectService.getProject(this.id).subscribe({
        next: project => {
          this.isEditMode = true;
          this.project = project;
          this.title = `Editing project: ${project.Code} - ${project.Name}`;
          this.getFromGroup('mainInformation').patchValue(project);
          this.getFromGroup('additionalInformation').patchValue(project);

          const date = new Date();
          const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
          let validFromControl = this.getFromGroup('additionalInformation').controls['ValidFrom'];
          validFromControl.setValidators([Validators.required]);
          validFromControl.patchValue(firstDayOfMonth);
        },
        error: err => this.errorMessage = err
      });

      this.disableDeleteButton$ = this.projectService.getDisableDeleteButton(this.id);
    }
    else {
      this.disableDeleteButton$ = of(true);
    }
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

  public prev(): void {
    this.currentStepIndex -= 1;
  }

  private getFormGroupByIndex() {
    let formGroup;
    if (this.currentStepIndex === 0)
      formGroup = this.getFromGroup('mainInformation');
    if (this.currentStepIndex === 1)
      formGroup = this.getFromGroup('additionalInformation');

    return formGroup;
  }

  public submit() {
    if (!this.projectForm.valid) {
      this.projectForm.markAllAsTouched();
      this.stepper.validateSteps();

      this.notificationService.show({
        content: "The form has invalid data. Please check.",
        cssClass: "button-notification",
        animation: { type: "slide", duration: 400 },
        position: { horizontal: "center", vertical: "bottom" },
        type: { style: "error", icon: true },
        closable: true
      });
    }
    else {

      const project = { ...this.project, ...this.projectForm?.get('mainInformation')?.value, ...this.projectForm?.get('additionalInformation')?.value };
      if (!this.isEditMode) {
        this.createProjectSub = this.projectService.createProject(project)
          .subscribe({
            next: id => {
              this.onSaveComplete();
              this.router.navigate(['/projects/view', id]);
            },
            error: err => this.errorMessage = err
          });
      }
      else {
        this.updateProjectSub = this.projectService.updateProject(project)
          .subscribe({
            next: () => {
              this.onSaveComplete();
              this.router.navigate(['/projects']);
            },
            error: err => this.errorMessage = err
          });
      }
    }
  }

  deleteProject() {
    this.deleteProjectSub = this.projectService.deleteProject(this.id).subscribe({
      next: () => {
        this.showSuccessNotification();
        this.router.navigate(['/projects']);
      },
      error: err => this.errorMessage = err
    });
  }

  onSaveComplete(): void {
    this.projectForm.reset();
    this.showSuccessNotification();
  }

  showSuccessNotification() {
    this.notificationService.show({
      content: "Success!",
      cssClass: "button-notification",
      animation: { type: "slide", duration: 400 },
      position: { horizontal: "center", vertical: "bottom" },
      type: { style: "success", icon: true },
      hideAfter: 2000
    });
  }

  closeDiscardDialog() {
    this.projectService.toggleProjectFormDiscardChangesDialog(false);
    this.discardChangesSubject.next(false);
  }

  discardChanges() {
    this.projectService.toggleProjectFormDiscardChangesDialog(false);
    this.discardChangesSubject.next(true);
  }

  openDeleteConfirm() {
    this.showDeleteProjectDialog = true;
  }

  closeDeleteProjectDialog() {
    this.showDeleteProjectDialog = false;
  }

  ngOnDestroy(): void {
    if (this.projectSub)
      this.projectSub.unsubscribe();
    if (this.createProjectSub)
      this.createProjectSub.unsubscribe();
    if (this.updateProjectSub)
      this.updateProjectSub.unsubscribe();
    if (this.deleteProjectSub)
      this.deleteProjectSub.unsubscribe();
  }

}
