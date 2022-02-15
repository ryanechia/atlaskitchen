export interface Item {
  id: number;
  start_time: Date;
  end_time: Date;
  modifiers: ItemModifier[];
  modifierGroups: ItemModifierGroup[];
}

export interface ItemModifier {
  id: number;
  label: string;
}

export interface ItemModifierGroup {
  id: number;
  label: string;
  modifiers: ItemModifier[];
}

export interface Section {
  id: number;
  items: Item[];
}

export interface Menu {
  id: number;
  label: string;
  sections: Section[];
}

export interface Outlet {
  id: number;
  label: string;
  timeslots: TimeSlot[];
}

export interface TimeSlot {
  id: number;
  start_time: Date;
  end_time: Date;
}
