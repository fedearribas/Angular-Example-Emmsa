import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StepperComponent } from '@progress/kendo-angular-layout';
import { aggregateBy, AggregateDescriptor, groupBy, GroupDescriptor, GroupResult } from '@progress/kendo-data-query';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Project } from '../../project';
import { ProjectService } from '../../project.service';
import { ProjectContractPrice } from './project-contract-price';

@Component({
  selector: 'app-project-contract-price',
  templateUrl: './project-contract-price.component.html',
  styleUrls: ['./project-contract-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContractPriceComponent implements OnInit {

  project$!: Observable<Project>;
  stepper!: StepperComponent;
  steps!: any[];
  currentStepIndex = 0;
  isLinear = true;
  id: number = 0;

  private gridDataSubject = new Subject<ProjectContractPrice[] | GroupResult[]>;
  gridData$ = this.gridDataSubject.asObservable();

  aggregates: AggregateDescriptor[] = [
    { field: "Total", aggregate: "sum" }
  ];

  group: GroupDescriptor[] = [
    { field: "ServiceTypeName", aggregates: this.aggregates },
    { field: "CurrencyName", aggregates: this.aggregates }
  ];

  totalSumFooter: any;

  constructor(private projectService: ProjectService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.steps = [
      { label: "Contract price" },
      { label: "Attachements" }
    ];

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.project$ = this.projectService.getProject(this.id);

    this.projectService.getContractPriceList(this.id).subscribe(
      data => {
        this.sortData(data);
        this.loadData(data);
        this.totalSumFooter = aggregateBy(data, this.aggregates);
      }
    );
  }

  public next(): void {
    this.currentStepIndex += 1;
  }

  public prev(): void {
    this.currentStepIndex -= 1;
  }

  private sortData(data: ProjectContractPrice[]) {
    data.sort((a, b) => {
      let fa = a.ServiceTypeName.toLowerCase(),
        fb = b.ServiceTypeName.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }

  private loadData(data: ProjectContractPrice[]): void {
    this.gridDataSubject.next(groupBy(data, this.group));
  }

}
