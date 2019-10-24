import React from 'react';
import './Filter.css';

const Filter = ({dispatch}) => {

    const handleShowAll = () => {
        dispatch({type: 'SHOW_ALL'});
    };

    const handleShowComplete = () => {
        dispatch({type: 'SHOW_COMPLETE'});
    };

    const handleShowIncomplete = () => {
        dispatch({type: 'SHOW_INCOMPLETE'});
    };

    return (
    <div className="btnSet">
        <button type="button" onClick={handleShowAll}>Show all</button>
        <button type="button" onClick={handleShowComplete}>Show complete</button>
        <button type="button" onClick={handleShowIncomplete}>Show incomplete</button>
    </div>
    );
};

export default Filter;