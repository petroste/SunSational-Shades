import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import customerRouter from './routes/customer.router.js';
import inventoryRouter from './routes/inventory.router.js';
import ordersRouter from './routes/orders.router.js';
import adminRouter from './routes/admin.router.js';
import reviewRouter from './routes/review.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

const url = process.env.ATLAS_URI;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log('Connected to the database ');
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

const PORT = process.env.PORT || 4000;
const server = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};

server.use(cors(corsOptions));
server.use(cookieParser())
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use('/api/users', customerRouter);
server.use('/api/inventory', inventoryRouter);
server.use('/api/orders', ordersRouter);
server.use('/api/admin', adminRouter);
server.use('/api/review', reviewRouter);

server.get('/', (req, res) => {
  res.send('Server is ready');
});

server.listen(PORT, () => console.log(`listening on port ${PORT}`));
