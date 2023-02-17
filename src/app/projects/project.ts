export interface Project {
  id: number;
  code: string;
  name: string;
  contractScopeId: number;
  contractStageId: number;
  projectManagerId: number;
  commercialProjectManagerId: number;
  productLineId: number;
  contractScopeName: string;
  contractStageName: string;
  ProjectMananagerName: string;
  ProductLineName: string;
  countryId: number;
  countryName: string;
  wtgUnits: number;
  projectFrom: Date;
  projectTo: Date;
  projectState: string;
  preliminaryAcceptanceCertificate: Date;
  finalAcceptanceCertificate: Date;
  pocPercent: number;
  billingPercent: number;
  bieCieValue: number;
  contractPercent: number;
  projectStatusId: number;
  fiscalYearFromId: number;
  periodFromId: number;
  validFrom: Date;
  validTo: Date;
  customerTypeId: number;
}

export interface ProjectForGrid {
  id: number;
  detailId: number;
  code: string;
  name: string;
  contractStageName: string;
  contractScopeName: string;
  productLineName: string;
  countryName: string;
  wtgUnits: string;
  planningHorizon: string;
  projectState: string;
  countryId: number;
  validFrom: Date;
  ValidTo: Date;
  validity: string;
  hasLog: boolean;
}