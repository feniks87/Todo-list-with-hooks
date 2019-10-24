import React, { useReducer } from 'react';
import uuid from 'uuid';
import './App.css';
import AddTodo from './components/AddTodo/AddTodo';
import Filter from './components/Filter/Filter';
import TodoList from './components/TodoList/TodoList';

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
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL');
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos);

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

  return (
    <div className="container">
      <h1 className="heading">Task list</h1>

      <div className="wrapper">
        <AddTodo dispatch={dispatchTodos} />
        <Filter dispatch={dispatchFilter} />
        <TodoList dispatch={dispatchTodos} todos={filteredTodos}/>
      </div>
    </div>
  );
}

export default App;
