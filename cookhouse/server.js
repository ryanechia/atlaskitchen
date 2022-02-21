import { outlets } from './mocks.js';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

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
