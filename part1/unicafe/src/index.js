import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistic = ({ type, count }) => {
  return (
    <tbody>
      <tr>
        <td>{type}</td>
        <td>{count}</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const statsDisplay = () => {
    if (good + neutral + bad) {
      return (
        <table>
          <Statistic type={'good'} count={good} />
          <Statistic type={'neutral'} count={neutral} />
          <Statistic type={'bad'} count={bad} />
          <Statistic type={'all'} count={good + neutral + bad} />
          <Statistic
            type={'average'}
            count={(good * 1 + bad * -1) / (good + neutral + bad)}
          />
          <Statistic
            type={'positive'}
            count={(good * 1) / (good + neutral + bad)}
          />
        </table>
      );
    } else {
      return 'No feedback given';
    }
  };

  return (
    <div>
      <h2>statistics</h2>
      {statsDisplay()}
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <div
      style={{
        padding: '2rem',
        margin: '2rem',
        border: '1px solid black',
        display: 'inline-block',
      }}
    >
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
