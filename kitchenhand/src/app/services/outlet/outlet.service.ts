import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Outlet } from './outlet.model';

@Injectable({
  providedIn: 'root'
})
export class OutletService {

  constructor(
    private http: HttpClient
  ) { }

  public getOutlets(): Observable<Outlet[]> {
    return this.http.get('').pipe(
      map((result) => result.outlets),
      map( outlets => outlets.map((outlet) => {
        return {
          id: outlet.id,
          label: outlet.label,
          timeslots: outlet.time_slots.map((timeslot) => {
            return {
              id: timeslot.id,
              startTime: timeslot.start_time,
              endTime: timeslot.end_time
            };
          })
        };
      }))
    );
  }
}
