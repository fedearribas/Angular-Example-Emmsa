export interface ProjectContractPrice {
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