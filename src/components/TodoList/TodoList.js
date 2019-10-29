import React from 'react';
import TodoItem from './TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ todos }) => (
    <ul className="list">
        {todos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
        ))}
    </ul>
)

export default TodoList;