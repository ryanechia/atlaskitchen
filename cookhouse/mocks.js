
export const modifiers = [
  {
    id: 1,
    label: 'least spicy'
  },
  {
    id: 2,
    label: 'normal spicy'
  },
  {
    id: 3,
    label: 'more spicy'
  },
];

export const modifierGroups = [
  {
    id: 1,
    label: 'Spicy Level',
    modifiers: [...modifiers]
  }
];

export const menuItems = [
  {
    id: 1,
    label: 'Spicy Wings',
    start_time: new Date(),
    end_time: new Date(),
    modifierGroups: [...modifierGroups]
  },
  {
    id: 2,
    label: 'Stir Fried Mala Xiang Guo',
    start_time: new Date(),
    end_time: new Date(),
    modifierGroups: [...modifierGroups]
  },

];

export const sections = [
  {
    id: 1,
    title: 'Appetizers',
    items: [...menuItems]
  }
];

export const menus = [
  {
    id: 1,
    label: 'All Day',
    sections
  }
];

export const timeslots = [
  {
    id: 1,
    start_time: new Date('2022-02-21T10:00:00.000Z'),
    end_time: new Date('2022-02-21T11:00:00.000Z')
  },
  {
    id: 2,
    start_time: new Date('2022-02-21T11:00:00.000Z'),
    end_time: new Date('2022-02-21T12:00:00.000Z')
  }
]

export const outlets = [
  {
    id: 1,
    label: 'Companion Frosty',
    menu: menus[0],
    image: 'https://via.placeholder.com/150',
    timeslots: [...timeslots]
  }
]
