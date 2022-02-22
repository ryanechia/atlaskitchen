
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
    outletId: 1,
    label: 'Spicy Wings',
    image: 'https://www.askchefdennis.com/wp-content/uploads/2011/02/buffalo-wings-100-680x614.jpg',
    startTime: new Date(),
    endTime: new Date(),
    modifierGroups: [...modifierGroups]

  },
  {
    id: 2,
    outletId: 1,
    label: 'Stir Fried Mala Xiang Guo',
    image: 'https://thewoksoflife.com/wp-content/uploads/2015/10/ma-la-xiang-guo-15.jpg',
    startTime: new Date(),
    endTime: new Date(),
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
    outletId: 1,
    startTime: new Date('2022-02-21T10:00:00.000Z'),
    endTime: new Date('2022-02-21T11:00:00.000Z')
  },
  {
    id: 2,
    outletId: 1,
    startTime: new Date('2022-02-21T11:00:00.000Z'),
    endTime: new Date('2022-02-21T12:00:00.000Z')
  },
  {
    id: 3,
    outletId: 1,
    startTime: new Date('2022-02-21T20:00:00.000Z'),
    endTime: new Date('2022-02-21T22:00:00.000Z'),
  },
  {
    id: 4,
    outletId: 1,
    startTime: new Date('2022-02-21T08:00:00.000Z'),
    endTime: new Date('2022-02-28T08:00:00.000Z'),
  },
  {
    id: 5,
    outletId: 1,
    startTime: new Date('2022-02-26T08:00:00.000Z'),
    endTime: new Date('2022-02-27T08:00:00.000Z'),
  },
  {
    id: 6,
    outletId: 1,
    startTime: new Date('2022-02-26T18:00:00.000Z'),
    endTime: new Date('2022-02-26T21:00:00.000Z'),
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

export const stockInfo = [
  {
    id: 1,
    timeslot: timeslots[2],
    quantity: 20,
    block: false
  },
  {
    id: 2,
    timeslot: timeslots[3],
    quantity: 500,
    block: false
  },
  {
    id: 3,
    timeslot: timeslots[4],
    quantity: null,
    block: true
  },
  {
    id: 4,
    timeslot: timeslots[5],
    quantity: null,
    block: true
  },
]

export const stocks = [
  {
    id: 1,
    menuItemId: 1,
    outletId: 1,
    pickupInventory: [stockInfo[1], stockInfo[3]],
    deliveryInventory: [stockInfo[0],stockInfo[2]],
  },
  {
    id: 2,
    menuItemId: 2,
    outletId: 1,
    pickupInventory: [stockInfo[1], stockInfo[3]],
    deliveryInventory: [stockInfo[0],stockInfo[2]],
  },
]
