import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Constants } from './constants';
import { DropdownModel } from './_shared/models/dropdown-model';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  private comboUrl = `${Constants.apiRoot}/Combo`;

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
