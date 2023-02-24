import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DropDownFillMode } from '@progress/kendo-angular-dropdowns';
import { GridSize } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { catchError, ignoreElements, of, Subscription } from 'rxjs';
import { ComboService } from 'src/app/combo.service';
import { DropdownModel } from 'src/app/shared/models/dropdown-model';
import { MainLayoutService } from 'src/app/_layout/main-layout.service';
import { ProjectService } from '../project.service';
import { ProjectFilters } from './project-filters';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectReportComponent implements OnInit, OnDestroy {
  cboDefaultItem: DropdownModel = { Text: 'All' };
  selectedCountry = this.cboDefaultItem;
  name?: string;

  
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
    private layoutService: MainLayoutService) { }

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

  refresh() {
    const filters: ProjectFilters = {
      countryId: this.selectedCountry?.Id,
      codeName: this.name
    };
    this.projectService.updateFilters(filters);
  }

  ngOnDestroy(): void {
    this.filtersSub.unsubscribe();
  }

}
