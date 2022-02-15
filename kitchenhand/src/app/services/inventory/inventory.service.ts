import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Outlet, TimeSlot } from './inventory.model';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class InventoryService {


  constructor(
    private http: HttpClient
  ) {
  }

  getStocks(outlet: Outlet, fulfillment_type: string, serving_date?: Date, timeslots?: TimeSlot[]): Observable<any> {
    let params = new HttpParams();
    params = params.set('outlet', outlet.id);
    params = params.set('fulfillment_type', fulfillment_type);

    if (serving_date) {
      params = params.set('serving_date', serving_date.toISOString());
    }
    if (timeslots) {
      params = params.set('timeslots', timeslots.join('|') || ''); // assuming BE will consume `|` as a seperator
    }
    return this.http.get('', { params }).pipe(
      catchError(() => of(void 0)), // don't terminate the observable. let subscription carry on.
    );
  }

  setStock(outlet: Outlet, fulfillment_type: string, serving_date: Date, timeslot: TimeSlot, amount?: number): Observable<boolean> {
    return this.http.post('',
      {
        serving_date,
        outlet,
        fulfillment_type,
        timeslot,
        amount
      },
      { observe: 'response' }
    ).pipe(
      map((response) => {
        return response.ok;
      }),
      catchError(() => of(false)),
    );
  }
}
