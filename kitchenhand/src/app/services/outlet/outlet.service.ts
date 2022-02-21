import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Outlet } from './outlet.model';

@Injectable({
  providedIn: 'root'
})
export class OutletService {

  constructor(
    private http: HttpClient
  ) { }

  public getOutlet(outletId: number): Observable<Outlet> {
    // @ts-ignore
    return this.http.get(`http://localhost:3000/outlets/${outletId}`).pipe(
      map((result: any) => result.outlet),
      map((outlet: any) => {
        return {
          id: outlet.id,
          label: outlet.label,
          menu: outlet.menu,
          image: outlet.image,
          timeslots: outlet.timeslots.map((timeslot: any) => {
            return {
              id: timeslot.id,
              startTime: timeslot.startTime,
              endTime: timeslot.endTime
            };
          })
        };
      }),
      // @ts-ignore
      catchError(() => of({})), // don't terminate the observable. let subscription carry on.
    );
  }

  public getOutlets(): Observable<Outlet[]> {
    return this.http.get('http://localhost:3000/outlets').pipe(
      map((result: any) => result.outlets),
      map( outlets => outlets.map((outlet: Outlet) => {
        return {
          id: outlet.id,
          label: outlet.label,
          menu: outlet.menu,
          image:outlet.image,
          timeslots: outlet.timeslots.map((timeslot: any) => {
            return {
              id: timeslot.id,
              startTime: timeslot.startTime,
              endTime: timeslot.endTime
            };
          })
        };
      }))
    );
  }
}
