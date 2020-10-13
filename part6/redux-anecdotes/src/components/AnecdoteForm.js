import React from 'react';
import { useDispatch } from 'react-redux';
import { newNote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNoteHandler = (e) => {
    e.preventDefault();
    dispatch(newNote(e.target.content.value));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNoteHandler}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
