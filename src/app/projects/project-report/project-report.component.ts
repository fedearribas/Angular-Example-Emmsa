import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { catchError, EMPTY, Observable, Subscription } from 'rxjs';
import { ComboService } from 'src/app/combo.service';
import { MainLayoutService } from 'src/app/_layout/main-layout.service';
import { DropdownModel } from 'src/app/_shared/models/dropdown-model';
import { ProjectForGrid } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss']
})
export class ProjectReportComponent implements OnInit, OnDestroy {

  countries$!: Observable<DropdownModel[]>;
  selectedCountryId!: number;
  name!: string;
  messages!: Message[];
  isDarkTheme!: boolean;
  projects$!: Observable<ProjectForGrid[]>;
  sub!: Subscription;

  validHistoryClassName = 'validHistoryLog';
  invalidHistoryClassName = 'invalidHistoryLog';

  constructor(private projectService: ProjectService,
    private comboService: ComboService,
    private layoutService: MainLayoutService) { }

  ngOnInit(): void {
    this.countries$ = this.comboService.getCountries();
    this.getProjects();

    this.sub = this.layoutService.isDarkTheme$.subscribe(
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

  getProjects() {
    this.projects$ = this.projectService.getProjectsWithLogs(this.selectedCountryId, this.name)
    .pipe(
      catchError(err => {
        this.messages = [
          { severity: 'error', summary: 'Error', detail: err }
        ];
        return EMPTY;
      })
    );
  }

  refresh() {
    this.getProjects();
  }

  create() {
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
