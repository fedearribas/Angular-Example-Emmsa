export interface ProjectContractPrice {
  Id: number;
  ProjectId: number | null;
  ServiceTypeId: number | null;
  ApplyByWTG: boolean;
  PeriodFrom: Date | null;
  PeriodTo: Date | null;
  CurrencyId: number | null;
  Price: number | null;
}

export interface ProjectContractPriceForGrid {
  Id: number;
  ServiceTypeId: number;
  ServiceTypeName: string;
  ApplyByWTG: boolean;
  WTGUnits: number;
  Period: string;
  CurrencyName: string;
  Price: number;
  Total: number;
}