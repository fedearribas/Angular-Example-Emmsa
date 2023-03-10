export interface Project {
  Id: number;
  Code: string;
  Name: string;
  ContractScopeId: number;
  ContractStageId: number;
  ProjectManagerId: number;
  CommercialProjectManagerId: number;
  ProductLineId: number;
  ContractScopeName: string;
  ContractStageName: string;
  ProjectManagerName: string;
  CommercialProjectManagerName: string;
  ProductLineName: string;
  CountryId: number;
  CountryName: string;
  WTGUnits: number;
  ProjectFrom: Date;
  ProjectTo: Date;
  ProjectState: string;
  PreliminaryAcceptanceCertificate: Date;
  FinalAcceptanceCertificate: Date;
  PoCPercent: number;
  BillingPercent: number;
  BieCieValue: number;
  ContractPercent: number;
  ProjectStatusId: number;
  FiscalYearFromId: number;
  PeriodFromId: number;
  ValidFrom: Date;
  ValidTo: Date;
  CustomerTypeId: number;
}

export interface ProjectForGrid {
  Id: number;
  DetailId: number;
  Code: string;
  Name: string;
  ContractStageName: string;
  ContractScopeName: string;
  ProductLineName: string;
  CountryName: string;
  WTGUnits: string;
  PlanningHorizon: string;
  ProjectState: string;
  CountryId: number;
  ValidFrom: Date;
  ValidTo: Date;
  Validity: string;
  HasLog: boolean;
  Logs: ProjectForGrid[];
}