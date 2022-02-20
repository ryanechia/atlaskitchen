import { Menu, TimeSlot } from '../inventory/inventory.model';

export interface Outlet {
  id: number;
  label: string;
  timeslots: TimeSlot[];
  menu: Menu;
  image: string; // a url
}
