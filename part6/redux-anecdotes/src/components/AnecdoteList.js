import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import {
  giveNotification,
  removeNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const anecdotes = useSelector(({ anecdotes }) => {
    return anecdotes
      .sort((a, b) => b.votes - a.votes)
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
  });

  const voteHandler = (anecdote) => {
    dispatch(vote(anecdote.id));

    dispatch(giveNotification(`You voted "${anecdote.content}"`));
    setTimeout(() => {
      dispatch(removeNotification());
      console.log('REMOVE');
    }, 1000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div
          style={{ borderTop: '1px solid #ddd', padding: '.25rem 0' }}
          key={anecdote.id}
        >
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
