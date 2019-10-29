import React, { useState, useContext } from 'react';
import uuid from 'uuid';
import './AddTodo.css';
import TodoContext from '../../context/TodoContext';


const AddTodo = () => {
    const dispatch = useContext(TodoContext);
    const [task, setTask] = useState('');

    const handleInput = event => {
        setTask(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (task) {
            dispatch({type: 'ADD_TASK', task, id: uuid()});
        }
        setTask('');
    };

    return (
        <form className="form" action="submit" onSubmit={handleSubmit}>
          <input type="text" value={task} onChange={handleInput}/>
          <button className="btn" type="submit">Add task</button>
        </form>
    )
};

export default AddTodo;