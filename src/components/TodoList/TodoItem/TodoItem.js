import React from 'react';
import './TodoItem.css';

const TodoItem = ({ dispatch, todo }) => {
    const handleCheckbox = () =>
        dispatch({
          type: todo.complete ? 'UNDO_TASK' : 'DO_TASK',
          id: todo.id
    });

    const completedTaskStyle = {
        textDecoration: 'line-through'
    }

    return (
        <li>
          <label style={todo.complete ? completedTaskStyle : null}>
            <input
              type="checkbox"
              className="checkbox"
              checked={todo.complete}
              onChange={handleCheckbox}
            />
            {todo.task}</label>
        </li>
    )
};

export default TodoItem;
