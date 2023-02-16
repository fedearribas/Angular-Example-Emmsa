import { Component, OnInit } from '@angular/core';
import { DropdownModel } from 'src/app/_shared/models/dropdown-model';
import { Project } from '../project';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss']
})
export class ProjectReportComponent implements OnInit {

  countries!: DropdownModel[];
  selectedCountry!: DropdownModel;
  name!: string;
  projects: Project[] = [
    {
      id: 1,
      code: 'test',
      name: 'test',
      contractScopeId: 1,
      contractStageId: 1,
      projectManagerId: 1,
      commercialProjectManagerId: 1,
      productLineId: 11,
      contractScopeName: 'test',
      contractStageName: 'test',
      ProjectMananagerName: 'test',
      ProductLineName: 'test',
      countryId: 1,
      countryName: 'test',
      wtgUnits: 2,
      projectFrom: new Date(),
      projectTo: new Date(),
      projectState: 'test',
      preliminaryAcceptanceCertificate: new Date(),
      finalAcceptanceCertificate: new Date(),
      pocPercent: 1,
      billingPercent: 1,
      bieCieValue: 1,
      contractPercent: 1,
      projectStatusId: 1,
      fiscalYearFromId: 1,
      periodFromId: 1,
      validFrom: new Date(),
      validTo: new Date(),
      customerTypeId: 1,
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.countries = [
      { code: 1, name: 'Argentina' },
      { code: 2, name: 'Chile' },
      { code: 3, name: 'Bolivia' },
      { code: 4, name: 'Brazil' },
      { code: 5, name: 'Uruguay' }
    ];
  }

}
