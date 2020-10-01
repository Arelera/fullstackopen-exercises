import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((p) => (
        <Part part={p.name} exercises={p.exercises} />
      ))}
    </>
  );
};

const Footer = ({ course }) => {
  return (
    <p>
      Number of exercises{' '}
      {course.parts.reduce((acc, curr) => {
        console.log(curr.exercises);
        return acc + curr.exercises;
      }, 0)}
    </p>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Footer course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
