import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { Observable } from 'rxjs';
import { Project } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
  
  project$!: Observable<Project>;
  stepper!: StepperComponent;
  steps!: any[];
  currentStepIndex = 0;
  isLinear = true;
  id: number = 0;

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.steps = [
      { label: "Contract price" },
      { label: "Attachements" }
    ];

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.project$ = this.projectService.getProject(this.id);
  }

  public next(): void {
    this.currentStepIndex += 1;
  }

  public prev(): void {
    this.currentStepIndex -= 1;
  }
}
