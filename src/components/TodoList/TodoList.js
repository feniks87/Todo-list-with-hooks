import React from 'react';
import TodoItem from './TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ dispatch, todos }) => (
    <ul className="list">
        {todos.map(todo => (
            <TodoItem key={todo.id} dispatch={dispatch} todo={todo} />
        ))}
    </ul>
)

export default TodoList;