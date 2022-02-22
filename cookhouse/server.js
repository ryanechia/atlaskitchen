import {
  menuItems,
  outlets,
  stockInfo as mockStocksInfo,
  stocks as mockStocks,
  timeslots as mockTimeslots
} from './mocks.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// no db, just store in memory.
let timeslots = mockTimeslots;
let stocks = mockStocks;
let stockInfo = mockStocksInfo;

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.get('/outlets', (req, res) => {
  res.send({
    outlets: outlets
  });
});

app.get('/outlets/:id', (req, res) => {
  const foundOutlet = outlets.filter((outlet) => outlet.id.toString() === req.params.id);
  if (foundOutlet.length > 0) {
    res.send({
      outlet: foundOutlet[0]
    });
  } else {
    res.sendStatus(404);
  }

});

app.get('/outlets/:outletId/item/:itemId/stock', (req, res) => {
  const foundStock = stocks.filter(
    (stock) => stock.outletId.toString() === req.params.outletId && stock.menuItemId.toString() === req.params.itemId);

  res.send({
    stock: foundStock[0]
  });
});

app.post('/outlets/:outletId/item/:itemId/stock', (req, res) => {
  const outletId = req.params.outletId;
  const itemId = req.params.itemId;
  const fulfillmentType = req.body.fulfillmentType;
  const timeslot = req.body.timeslot;
  const amount = req.body.amount;
  const isBlocked = req.body.isBlocked;

  const foundStock = stocks.filter(
    (stock) => stock.outletId.toString() === outletId && stock.menuItemId.toString() === itemId);
  if (foundStock.length > 0) {
    const foundStockIdx = stocks.indexOf(foundStock[0]);

    // find or create new timeslot obj
    const foundTimeslot = timeslots.filter((slot) => slot.startTime === timeslot.startTime && slot.endTime === timeslot.endTime);
    let newTimeslot;
    if (foundTimeslot.length > 0) {
      // there is a duplicate
      newTimeslot = foundTimeslot[0];
    } else {
      // create new
      const newId = timeslots.length + 1;
      newTimeslot = {
        id: newId,
        outletId,
        startTime: timeslot.startTime,
        endTime: timeslot.endTime
      };
      timeslots.push(newTimeslot);
    }
    const newInventory = {
      id: stockInfo.length + 1,
      timeslot: newTimeslot,
      quantity: amount,
      block: isBlocked
    };
    stockInfo.push(newInventory);

    switch (fulfillmentType) {
      case 'delivery':
        stocks[foundStockIdx].deliveryInventory.push(newInventory);
        break;
      case 'pickup':
        stocks[foundStockIdx].pickupInventory.push(newInventory);
        break;
      default:
        res.sendStatus(403);
        return;
    }

    res.send({
      stock: stocks[foundStockIdx]
    });
  } else {
    res.sendStatus(403);
  }
});


app.patch('/outlets/:outletId/item/:itemId/stock/:inventoryId', (req, res) => {
  const outletId = req.params.outletId;
  const inventoryId = req.params.inventoryId;
  const itemId = req.params.itemId;
  const fulfillmentType = req.body.fulfillmentType;
  const timeslot = req.body.timeslot;
  const amount = req.body.amount;
  const isBlocked = req.body.isBlocked;

  const foundStock = stocks.filter(
    (stock) => stock.outletId.toString() === outletId && stock.menuItemId.toString() === itemId);
  if (foundStock.length > 0) {
    const foundStockIdx = stocks.indexOf(foundStock[0]);

    // find or create new timeslot obj
    const foundTimeslot = timeslots.filter((slot) => slot.startTime === timeslot.startTime && slot.endTime === timeslot.endTime);
    let newTimeslot;
    if (foundTimeslot.length > 0) {
      // there is a duplicate
      newTimeslot = foundTimeslot[0];
    } else {
      // create new
      const newId = timeslots.length;
      newTimeslot = {
        id: newId,
        outletId,
        startTime: timeslot.startTime,
        endTime: timeslot.endTime
      };
      timeslots.push(newTimeslot);
    }
    let inventoryIdx;
    switch (fulfillmentType) {
      case 'delivery':
        inventoryIdx = stocks[foundStockIdx].deliveryInventory.indexOf(stocks[foundStockIdx].deliveryInventory.find((inventory) => inventory.id.toString() === inventoryId))
        stocks[foundStockIdx].deliveryInventory[inventoryIdx] = {
          id: inventoryId,
          timeslot: newTimeslot,
          quantity: amount,
          block: isBlocked
        };
        break;
      case 'pickup':
        inventoryIdx = stocks[foundStockIdx].pickupInventory.indexOf(stocks[foundStockIdx].pickupInventory.find((inventory) => inventory.id.toString() === inventoryId))
        stocks[foundStockIdx].pickupInventory[inventoryIdx] = {
          id: inventoryId,
          timeslot: newTimeslot,
          quantity: amount,
          block: isBlocked
        };
        break;
      default:
        res.sendStatus(403);
        return;
    }

    res.send({
      inventory: stocks[foundStockIdx].pickupInventory[inventoryIdx]
    });
  } else {
    res.sendStatus(403);
  }

});

app.get('/outlets/:outletId/item/:itemId', (req, res) => {
  const foundStock = menuItems.filter(
    (menuItem) => menuItem.outletId.toString() === req.params.outletId && menuItem.id.toString() === req.params.itemId);

  res.send({
    item: foundStock[0]
  });
});


const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const processInterruption = (signals) => {
  server.close(err => {
    console.log('Server terminated', err, signals);
  });
};
process.on('SIGTERM', processInterruption);
process.on('SIGINT', processInterruption);
