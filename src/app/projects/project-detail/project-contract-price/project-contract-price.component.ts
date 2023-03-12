import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { aggregateBy, AggregateDescriptor, groupBy, GroupDescriptor, GroupResult } from '@progress/kendo-data-query';
import { Subject, Subscription } from 'rxjs';
import { ProjectService } from '../../project.service';
import { ProjectContractPrice, ProjectContractPriceForGrid } from './project-contract-price';
import { ProjectContractPriceFormComponent } from './project-contract-price-form/project-contract-price-form.component';

@Component({
  selector: 'app-project-contract-price',
  templateUrl: './project-contract-price.component.html',
  styleUrls: ['./project-contract-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContractPriceComponent implements OnInit, OnDestroy {
  @Input() projectId!: number;

  private gridDataSubject = new Subject<ProjectContractPriceForGrid[] | GroupResult[]>;
  gridData$ = this.gridDataSubject.asObservable();

  aggregates: AggregateDescriptor[] = [
    { field: "Total", aggregate: "sum" }
  ];

  group: GroupDescriptor[] = [
    { field: "ServiceTypeName", aggregates: this.aggregates },
    { field: "CurrencyName", aggregates: this.aggregates }
  ];

  totalSumFooter: any;

  formItem!: ProjectContractPrice;
  isNew!: boolean;
  errorMessage!: string;

  @ViewChild('form') formComponent!: ProjectContractPriceFormComponent;

  getDataSub!: Subscription;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.getDataFromApi();
  }

  addHandler(): void {
    this.formItem = this.getEmptyFormItem();
    this.isNew = true;
    this.formComponent.open();
  }

  onSaveCompleted() {
    this.getDataSub.unsubscribe();
    this.getDataFromApi();
  }

  private getDataFromApi() {
    this.getDataSub = this.projectService.getContractPriceList(this.projectId).subscribe(
      data => {
        this.sortGridData(data);
        this.loadGridData(data);
        this.totalSumFooter = aggregateBy(data, this.aggregates);
      }
    );
  }

  private loadGridData(data: ProjectContractPriceForGrid[]): void {
    this.gridDataSubject.next(groupBy(data, this.group));
  }

  private sortGridData(data: ProjectContractPriceForGrid[]) {
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

  private getEmptyFormItem() {
    const item: ProjectContractPrice = {
      Id: 0,
      ProjectId: this.projectId,
      ServiceTypeId: null,
      ApplyByWTG: false,
      PeriodFrom: null,
      PeriodTo: null,
      CurrencyId: null,
      Price: null
    };

    return item;
  }

  ngOnDestroy(): void {
    this.getDataSub.unsubscribe();
  }

}
