import React, { useState, useReducer } from 'react';
import uuid from 'uuid';
import './App.css';

const initialTodos = [
  {
    id: uuid(),
    task: 'Learn React',
    complete: true
  },
  {
    id: uuid(),
    task: 'Learn Redux',
    complete: false
  },
  {
    id: uuid(),
    task: 'Learn React hooks',
    complete: true
  }
];

const filterReducer = (state, action) => {
  switch(action.type) {
    case 'SHOW_ALL':
      return 'ALL';
    case 'SHOW_COMPLETE':
      return 'COMPLETE';
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE';
    default:
      throw new Error();
  }
};

const todoReducer = (state, action) => {
  switch(action.type) {
    case 'DO_TASK':
      return state.map(todo => {
        if (todo.id === action.id) {
          return {...todo, complete: true};
        } else {
          return todo;
        }
      });
    case 'UNDO_TASK':
      return state.map(todo => {
        if (todo.id === action.id) {
          return {...todo, complete: false};
        } else {
          return todo;
        }
      });
    case 'ADD_TASK':
      return state.concat({
        id: action.id,
        task: action.task,
        complete: false
      });
    default:
      throw new Error();
  }
};

const App = () => {
  const [task, setTask] = useState('');
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);

const handleInput = event => {
  setTask(event.target.value);
};

const handleSubmit = event => {
  event.preventDefault();
  if (task) {
    dispatchTodos({type: 'ADD_TASK', task, id: uuid()});
  }
  setTask('');
};

const handleCheckbox = todo => {
  dispatchTodos({
    type: todo.complete ? 'UNDO_TASK' : 'DO_TASK',
    id: todo.id
  })
};

const handleShowAll = () => {
  dispatchFilter({type: 'SHOW_ALL'});
};

const handleShowComplete = () => {
  dispatchFilter({type: 'SHOW_COMPLETE'});
};

const handleShowIncomplete = () => {
  dispatchFilter({type: 'SHOW_INCOMPLETE'});
};

const filteredTodos = todos.filter(todo => {
  if (filter === 'ALL') {
    return true;
  }
  if (filter === 'COMPLETE' && todo.complete) {
    return true;
  }
  if (filter === 'INCOMPLETE' && !todo.complete) {
    return true;
  }
  return false;
})

  const completedTaskStyle = {
    textDecoration: 'line-through'
  }

  return (
    <div className="container">
      <h1 className="heading">Task list</h1>

      <div className="wrapper">
        <form className="form" action="submit" onSubmit={handleSubmit}>
          <input type="text" value={task} onChange={handleInput}/>
          <button className="btn" type="submit">Add task</button>
        </form>

        <div className="btnSet">
          <button type="button" onClick={handleShowAll}>Show all</button>
          <button type="button" onClick={handleShowComplete}>Show complete</button>
          <button type="button" onClick={handleShowIncomplete}>Show incomplete</button>
        </div>

        <ul className="list">
          {filteredTodos.map(todo => (
            <li key={todo.id}>
              <label style={todo.complete ? completedTaskStyle : null}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={todo.complete}
                  onChange={() => handleCheckbox(todo)}/>
                {todo.task}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
