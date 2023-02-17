import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { catchError, EMPTY, Observable } from 'rxjs';
import { DropdownModel } from 'src/app/_shared/models/dropdown-model';
import { Project, ProjectForGrid } from '../project';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss']
})
export class ProjectReportComponent implements OnInit {

  countries!: DropdownModel[];
  selectedCountry!: DropdownModel;
  name!: string;
  messages!: Message[];

  projects$!: Observable<ProjectForGrid[]>;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.countries = [
      { code: 1, name: 'Argentina' },
      { code: 2, name: 'Chile' },
      { code: 3, name: 'Bolivia' },
      { code: 4, name: 'Brazil' },
      { code: 5, name: 'Uruguay' }
    ];

    this.getProjects();
  }

  getProjects() {
    this.projects$ = this.projectService.getProjects(this.selectedCountry?.code, this.name)
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
