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

//------------------------------------------------ Todo Controller... ------------------------------------------------//

server.get('/todos', async (_, response) => 
{
  const todosList = await Todo.find().lean().exec();

  response.json(todosList?.length ? todosList : []);
});

server.post('/todo', async (request, response) => 
{
  const todo = await (new Todo(request?.body)).save();

  response.json(todo?._id ? todo : { error: `todo item not created...` });
});

server.get('/todo/:id', async (request, response) => 
{
  const todo = await Todo.findById(request.params?.id);

  if (todo?._id)
  {
    response.json(todo);
  }

  else 
  {
    response.status(404).json({ error: `todo item not found...` });
  }
});

server.put('/todo/:id', async (request, response) => 
{
  const todo = await Todo.findById(request.params?.id);

  if (todo?._id)
  {
    todo.task = request.body?.task;

    await todo?.save();

    response.json(todo);
  }

  else 
  {
    response.status(404).json({ error: `todo item not found...` });
  }
});

server.delete('/todo/:id', async (request, response) => 
{
  const todo = await Todo.findById(request.params?.id);

  if (todo?._id)
  {
    todo.task = request.body?.task;

    await todo?.deleteOne();

    response.json(todo);
  }

  else 
  {
    response.status(404).json({ error: `todo item not found...` });
  }
});

server.get('/todo/toggle/:id', async (request, response) => 
{
  const todo = await Todo.findById(request.params?.id);

  if (todo?._id)
  {
    todo.isFinished = !todo.isFinished;

    await todo?.save();

    response.json(todo);
  }

  else 
  {
    response.status(404).json({ error: `todo item not found...` });
  }
});

//------------------------------------------------ Server Bootup... ------------------------------------------------//

server.listen
(
  process.env.PORT,
  () => console.log(`server is running on port = ${process.env.PORT}...`),
);
