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

  getStocks(outlet: Outlet, fulfillmentType: string, servingDate?: Date, timeSlots?: TimeSlot[]): Observable<any> {
    let params = new HttpParams();
    params = params.set('outlet', outlet.id);
    params = params.set('fulfillment_type', fulfillmentType);

    if (servingDate) {
      params = params.set('serving_date', servingDate.toISOString());
    }
    if (timeSlots) {
      params = params.set('time_slots', timeSlots.join('|') || ''); // assuming BE will consume `|` as a seperator
    }
    return this.http.get('', { params }).pipe(
      catchError(() => of(void 0)), // don't terminate the observable. let subscription carry on.
    );
  }

  setStock(outlet: Outlet, fulfillmentType: string, servingDate: Date, timeslot: TimeSlot, amount?: number): Observable<boolean> {
    return this.http.post('',
      {
        serving_date: servingDate,
        outlet,
        fulfillment_type: fulfillmentType,
        time_slot: timeslot,
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
