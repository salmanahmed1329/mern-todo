import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import { DB_Connect } from './db';
import { Todo } from './collection';

//------------------------------------------------ Server Connection... ------------------------------------------------//

const server = express();

server.use(express.json());
server.use(cors());

dotenv.config();

//------------------------------------------------ Database Connection... ------------------------------------------------//

await DB_Connect();

//------------------------------------------------ Server Bootup... ------------------------------------------------//

server.listen
(
  process.env.PORT,
  () => console.log(`server is running on port = ${process.env.PORT}...`),
);
