import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const AnecdoteOfTheDay = ({ anecdotes, votes, selected }) => {
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <p>Has {votes[selected]} votes</p>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const MostVoted = ({ votes }) => {
  let maxIndex = votes.indexOf(Math.max(...votes));
  return (
    <div>
      <h2>Anecdote with most votes</h2>
      {anecdotes[maxIndex]}
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const randNum = () => Math.floor(Math.random() * anecdotes.length);

  return (
    <div>
      <AnecdoteOfTheDay
        anecdotes={anecdotes}
        votes={votes}
        selected={selected}
      />
      <Button
        onClick={() => {
          const newVotes = [...votes];
          newVotes[selected] += 1;
          setVotes(newVotes);
        }}
        text="vote"
      />{' '}
      <Button onClick={() => setSelected(randNum)} text={'next anecdote'} />
      <br />
      <MostVoted votes={votes} />
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
