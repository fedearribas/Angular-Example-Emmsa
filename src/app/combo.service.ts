import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Constants } from './constants';
import { DropdownModel } from './shared/models/dropdown-model';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  private comboUrl = `${Constants.apiRoot}/Combo`;

  get chooseOneItemValue(): DropdownModel {
    return { Id: null, Text: 'Choose one item...' };
  }

  get selectAllItemValue(): DropdownModel {
    return { Id: null, Text: 'All' };
  }

  constructor(private http: HttpClient) { }

  getCountries(fiscalYearId?: number, periodId?: number, isBudget?: boolean): Observable<DropdownModel[]> {
    const url = `${this.comboUrl}/GetCountry`;
    let queryParams = new HttpParams();

    if (fiscalYearId)
      queryParams = queryParams.append("fiscalYearId", fiscalYearId);
    if (periodId)
      queryParams = queryParams.append("periodId", periodId);
    if (isBudget)
      queryParams = queryParams.append("isBudget", isBudget);

    return this.http.get<DropdownModel[]>(url, { params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  getContractScope(): Observable<DropdownModel[]> {
    const url = `${this.comboUrl}/GetContractScope`;

    return this.http.get<DropdownModel[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getContractStage(projectId?: number): Observable<DropdownModel[]> {
    const url = `${this.comboUrl}/GetContractStage`;
    let queryParams = new HttpParams();

    if (projectId)
      queryParams = queryParams.append("projectId", projectId);

    return this.http.get<DropdownModel[]>(url, { params: queryParams })
      .pipe(
        catchError(this.handleError)
      );
  }

  getProductLine(): Observable<DropdownModel[]> {
    const url = `${this.comboUrl}/GetProductLine`;

    return this.http.get<DropdownModel[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCustomerType(): Observable<DropdownModel[]> {
    const url = `${this.comboUrl}/GetCustomerType`;

    return this.http.get<DropdownModel[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProjectManager(): Observable<DropdownModel<string>[]> {
    const url = `${this.comboUrl}/GetProjectManager`;

    return this.http.get<DropdownModel<string>[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCommercialProjectManager(): Observable<DropdownModel<string>[]> {
    const url = `${this.comboUrl}/GetCommercialProjectManager`;

    return this.http.get<DropdownModel<string>[]>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(err: any): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
}
