import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const processInterruption = (signals) => {
  server.close(err => {
    console.log('Server terminated', err, signals);
  });
};
process.on('SIGTERM', processInterruption);
process.on('SIGINT', processInterruption);
