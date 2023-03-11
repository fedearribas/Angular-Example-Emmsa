import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { Observable } from 'rxjs';
import { Project } from '../../project';
import { ProjectService } from '../../project.service';

@Component({
  selector: 'app-project-contract-price',
  templateUrl: './project-contract-price.component.html',
  styleUrls: ['./project-contract-price.component.scss']
})
export class ProjectContractPriceComponent implements OnInit {

  project$!: Observable<Project>;
  stepper!: StepperComponent;
  steps!: any[];
  currentStepIndex = 0;
  isLinear = true;
  

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) { }
  
  ngOnInit(): void {

    this.steps = [
      { label: "Contract price" },
      { label: "Attachements" }
    ];

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.project$ = this.projectService.getProject(id);
  }

  public next(): void {
    this.currentStepIndex += 1;
  }

  public prev(): void {
    this.currentStepIndex -= 1;
  }

}
