import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { aggregateBy, AggregateDescriptor, groupBy, GroupDescriptor, GroupResult } from '@progress/kendo-data-query';
import { Subject } from 'rxjs';
import { ProjectService } from '../../project.service';
import { ProjectContractPrice } from './project-contract-price';

@Component({
  selector: 'app-project-contract-price',
  templateUrl: './project-contract-price.component.html',
  styleUrls: ['./project-contract-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectContractPriceComponent implements OnInit {
  @Input() projectId!: number;

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

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getContractPriceList(this.projectId).subscribe(
      data => {
        this.sortData(data);
        this.loadData(data);
        this.totalSumFooter = aggregateBy(data, this.aggregates);
      }
    );
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
