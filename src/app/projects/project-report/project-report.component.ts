import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { ComboService } from 'src/app/combo.service';
import { DropdownModel } from 'src/app/_shared/models/dropdown-model';
import { Project, ProjectForGrid } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss']
})
export class ProjectReportComponent implements OnInit {

  countries$!: Observable<DropdownModel[]>;
  selectedCountryId!: number;
  name!: string;
  messages!: Message[];

  projects$!: Observable<ProjectForGrid[]>;

  constructor(private projectService: ProjectService,
    private comboService: ComboService) { }

  ngOnInit(): void {
    this.countries$ = this.comboService.getCountries();
    this.getProjects();
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

}
