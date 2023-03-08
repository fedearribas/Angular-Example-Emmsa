import { AfterContentChecked, ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataStateChangeEvent, GridComponent, RowClassArgs } from '@progress/kendo-angular-grid';
import { catchError, ignoreElements, of, Subscription, take } from 'rxjs';
import { ComboService } from 'src/app/combo.service';
import { ProjectForGrid } from '../project';
import { ProjectService } from '../project.service';
import { ProjectFilters } from './project-filters';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectReportComponent implements OnInit, OnDestroy, AfterContentChecked {
  cboDefaultItem = this.comboService.selectAllItemValue;
  selectedCountry = this.cboDefaultItem;
  name!: string;
  loading$ = this.projectService.isLoadingGrid$;

  @ViewChild(GridComponent) grid!: GridComponent;
  filtersSub!: Subscription;

  countries$ = this.comboService.getCountries();
  projects$ = this.projectService.projects$;
  projectsError$ = this.projects$.pipe(
    ignoreElements(),
    catchError((err: string) => of(err))
  );

  constructor(private projectService: ProjectService,
    private comboService: ComboService,
    private ngZone: NgZone) { }

  ngOnInit(): void {

    this.filtersSub = this.projectService.filters$.subscribe(
      filters => {
        this.selectedCountry.Id = filters.countryId;
        this.name = filters.codeName;
      });
  }

  ngAfterContentChecked(): void {
    this.fitColumns();
  }

  refresh() {
    const filters: ProjectFilters = {
      countryId: this.selectedCountry?.Id,
      codeName: this.name
    };
    this.projectService.updateFilters(filters);
  }

  onDataStateChange(state: DataStateChangeEvent): void {
    this.fitColumns();
  }

  rowClassCallback = (context: RowClassArgs) => {
    if (context.dataItem.ValidFrom >  context.dataItem.ValidTo) {
      return { invalidLog: true };
    } else {
      return { validLog: true };
    }
  }

  public showDetailGrid(dataItem: ProjectForGrid): boolean {
    return dataItem.HasLog;
  }

  private fitColumns(): void {
    this.ngZone.onStable
      .asObservable()
      .pipe(take(1))
      .subscribe(() => {
        if (this.grid)
          this.grid.autoFitColumns();
      });
  }

  ngOnDestroy(): void {
    this.filtersSub.unsubscribe();
  }

}
