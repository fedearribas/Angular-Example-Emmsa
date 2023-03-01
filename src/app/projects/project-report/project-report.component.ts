import { AfterContentChecked, ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataStateChangeEvent, GridComponent, GridSize, RowClassArgs } from '@progress/kendo-angular-grid';
import { catchError, ignoreElements, of, Subscription, take } from 'rxjs';
import { ComboService } from 'src/app/combo.service';
import { DropdownModel } from 'src/app/shared/models/dropdown-model';
import { MainLayoutService } from 'src/app/_layout/main-layout.service';
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
  cboDefaultItem: DropdownModel = { Text: 'All' };
  selectedCountry = this.cboDefaultItem;
  name?: string;

  @ViewChild(GridComponent) grid!: GridComponent;

  isDarkTheme!: boolean;
  filtersSub!: Subscription;

  countries$ = this.comboService.getCountries();
  projects$ = this.projectService.projects$;
  projectsError$ = this.projects$.pipe(
    ignoreElements(),
    catchError((err: string) => of(err))
  );

  // these should be observables
  validHistoryClassName = 'validHistoryLog';
  invalidHistoryClassName = 'invalidHistoryLog';

  constructor(private projectService: ProjectService,
    private comboService: ComboService,
    private layoutService: MainLayoutService,
    private ngZone: NgZone) { }

  ngOnInit(): void {

    this.filtersSub = this.projectService.filters$.subscribe(
      filters => {
        this.selectedCountry.Id = filters.countryId;
        this.name = filters.codeName;
      });

    // this logic should be on service
    this.layoutService.isDarkTheme$.subscribe(
      isDarkTheme => {
        if (isDarkTheme) {
          this.validHistoryClassName = 'validHistoryLogDarkTheme';
          this.invalidHistoryClassName = 'invalidHistoryLogDarkTheme';
        }
        else {
          this.validHistoryClassName = 'validHistoryLog';
          this.invalidHistoryClassName = 'invalidHistoryLog';
        }
      }
    );
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
        this.grid.autoFitColumns();
      });
  }

  ngOnDestroy(): void {
    this.filtersSub.unsubscribe();
  }

}
