import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Item, Stock, TimeSlot } from './inventory.model';
import { catchError, map, Observable, of } from 'rxjs';
import { Outlet } from '../outlet/outlet.model';

@Injectable({
  providedIn: 'root'
})


export class InventoryService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getStocks(outletId: number, itemId?: number, fulfillmentType?: string, servingDate?: Date, timeSlots?: TimeSlot[]): Observable<Stock> {
    let params = new HttpParams();
    if (fulfillmentType) {
      params = params.set('fulfillment_type', fulfillmentType);
    }
    if (servingDate) {
      params = params.set('serving_date', servingDate.toISOString());
    }
    if (timeSlots) {
      params = params.set('time_slots', timeSlots.join('|') || ''); // assuming BE will consume `|` as a seperator
    }
    return this.http.get(`http://localhost:3000/outlets/${outletId}${itemId ? `/item/${itemId}`: ''}/stock`, { params }).pipe(
      map((response: any) => response.stock)
    );
  }

  public setStock(outletId: number, itemId: number, fulfillmentType: string, isBlocked?: boolean,
                  timeslot?: TimeSlot, amount?: number): Observable<boolean> {

    return this.http.post(`/outlets/${outletId}/item/${itemId}/stock`,
      {
        fulfillmentType,
        timeslot, // assumes the backend will search and match to existing timeslots and create if it doesn't exist.
        amount,
        isBlocked
      },
      { observe: 'response' }
    ).pipe(
      map((response) => {
        return response.ok;
      }),
      catchError(() => of(false)),
    );
  }

  public getItem(outletId: number, itemId: number): Observable<Item> {
    return this.http.get( `http://localhost:3000/outlets/${outletId}/item/${itemId}`).pipe(
      map((response: any) => response.item)
    );
  }
}
