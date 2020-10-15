import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = (props) => {
  // const dispatch = useDispatch();
  // const filter = useSelector((state) => state.filter);

  const anecdotes = props.anecdotes
    .sort((a, b) => b.votes - a.votes)
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
    );

  // const anecdotes = useSelector(({ anecdotes }) => {
  //   return anecdotes
  //     .sort((a, b) => b.votes - a.votes)
  //     .filter((anecdote) =>
  //       anecdote.content.toLowerCase().includes(filter.toLowerCase())
  //     );
  // });

  const voteHandler = (anecdote) => {
    props.vote(anecdote);
    props.setNotification(`You voted "${anecdote.content}"`, 5);
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  };
};

const mapDispatchToProps = {
  vote,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
