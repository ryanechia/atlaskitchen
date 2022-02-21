export interface Item {
  id: number;
  label: string;
  image: string;
  startTime: Date;
  endTime: Date;
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
  title: string;
  items: Item[];
}

export interface Menu {
  id: number;
  label: string;
  sections: Section[];
}

export interface TimeSlot {
  id: number;
  startTime: Date;
  endTime: Date;
}
