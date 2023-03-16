import express from 'express';
import cors from 'cors';
import { initDB } from './db/index.js';
import { todoRouter } from './Routes/to-doList-router.js';

const server = express();
const port = process.env['APP_ENV'] || 3000;

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/v1', todoRouter);

server.listen(port, () =>
  initDB().then(() => console.log('DB Initialized! 😸'))
);
