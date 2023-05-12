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
  try
  {
    const todosList = await Todo.find().lean().exec();

    response.json(todosList?.length ? todosList : []);
  }

  catch (exception)
  {
    response.json(exception);
  }
});

server.post('/todo', async (request, response) => 
{
  try
  {
    const todo = await (new Todo(request?.body)).save();

    if (todo?._id)
    {
      response.json(todo);
    }

    else 
    {
      response.status(404).json({ error: `todo item not created...` });
    }
  }

  catch (exception)
  {
    response.json(exception);
  }
});

server.get('/todo/:id', async (request, response) => 
{
  try
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
  }

  catch (exception)
  {
    response.json(exception);
  }
});

server.put('/todo/:id', async (request, response) => 
{
  try
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
  }

  catch (exception)
  {
    response.json(exception);
  }
});

server.delete('/todo/:id', async (request, response) => 
{
  try
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
  }

  catch (exception)
  {
    response.json(exception);
  }
});

server.get('/todo/toggle/:id', async (request, response) => 
{
  try
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
  }

  catch (exception)
  {
    response.json(exception);
  }
});

//------------------------------------------------ Server Bootup... ------------------------------------------------//

server.listen
(
  process.env.PORT,
  () => console.log(`server is running on port = ${process.env.PORT}...`),
);
