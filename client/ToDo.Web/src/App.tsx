import { useEffect, useState } from 'react';

import './App.css';

////////////////////////////////////////////////////////////////////////////////////////////////////

type Todo = 
{
  _id: string;
  task: string;
  isFinished: boolean;
  timestamp: Date;
  __v: string;
};

const App = () => 
{
  //////////////////////////////////////////////////
  //#region - variables

  const [shouldRender, setShouldRender] = useState(false);

  const [todosList, setTodosList] = useState<Todo[]>([]);

  //#endregion

  //////////////////////////////////////////////////
  //#region - functions

  useEffect(() => 
  {
    FetchTodosList();

  }, []);

  async function FetchTodosList()
  {
    const options: RequestInit = 
    {
      method: 'GET',
      headers: 
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    await fetch('http://localhost:5001/todos', options)
    .then(response => 
      response.json()
    )
    .then((data: Todo[]) => 
      setTodosList(data)
    )
    .catch(exception => 
      console.log(`exception = ${JSON.stringify(exception)}`)
    )
    .finally(() => 
      setShouldRender(true)
    );
  }

  async function ToggleTodo(id: string)
  {
    const options: RequestInit = 
    {
      method: 'GET',
      headers: 
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    await fetch(`http://localhost:5001/todo/toggle/${id}`, options)
    .then(response => 
      response.json()
    )
    .then((data: Todo) => 
    {
      setTodosList(todos => 
        todos?.map(todoItem => 
          todoItem._id == data?._id ? { ...todoItem, isFinished: data?.isFinished } : todoItem
        )
      );
    })
    .catch(exception => 
      console.log(`exception = ${JSON.stringify(exception)}`)
    )
    .finally(() => 
      setShouldRender(true)
    );
  }

  async function DeleteTodo(id: string)
  {
    const options: RequestInit = 
    {
      method: 'DELETE',
      headers: 
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    await fetch(`http://localhost:5001/todo/${id}`, options)
    .then(response => 
      response.json()
    )
    .then((data: Todo) => 
    {
      setTodosList(todos => 
        todos?.filter(todoItem => 
          todoItem._id != data?._id
        )
      );
    })
    .catch(exception => 
      console.log(`exception = ${JSON.stringify(exception)}`)
    )
    .finally(() => 
      setShouldRender(true)
    );
  }

  //#endregion

  //////////////////////////////////////////////////
  //#region - render

  return (
    <div className="App">
      <h1>{"Welcome, SalmanAhmed1329"}</h1>
      <h4>{"Your Tasks"}</h4>

      {
        shouldRender
        &&
        <div className="todos">
          {
            todosList?.map((todoItem: any) => 
              <TodoView
                key={todoItem._id}
                todo={todoItem}
                OnToggle={() => ToggleTodo(todoItem._id)}
                OnDelete={() => DeleteTodo(todoItem._id)}
              />
            )
          }
        </div>
      }
    </div>
  );

  //#endregion

  //////////////////////////////////////////////////
};

////////////////////////////////////////////////////////////////////////////////////////////////////

type TodoViewType = 
{
  todo: Todo;
  OnToggle: () => void;
  OnDelete: () => void;
};

const TodoView = (props: TodoViewType) => 
{
  //////////////////////////////////////////////////
  //#region - variables

  const todo = props.todo;

  //#endregion

  //////////////////////////////////////////////////
  //#region - render

  return (
    <div key={todo?._id} className={"todo" + (todo.isFinished ? " is-finished" : "")} onClick={() => props.OnToggle()}>
      <div className="checkbox"></div>
      <div className="task">
        {todo?.task}
      </div>
      <div className="delete-todo" onClick={() => props.OnDelete()}>{"X"}</div>
    </div>
  );

  //#endregion

  //////////////////////////////////////////////////
};

////////////////////////////////////////////////////////////////////////////////////////////////////

export default App;
