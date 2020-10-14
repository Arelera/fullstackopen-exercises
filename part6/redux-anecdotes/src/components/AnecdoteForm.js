import React from 'react';
import { useDispatch } from 'react-redux';
import { newNote } from '../reducers/anecdoteReducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNoteHandler = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    dispatch(newNote(content));
    e.target.content.value = '';
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
