import React from 'react';

const Course = ({ courses }) => {
  const exerciseTotal = (course) =>
    course.parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      {courses.map((course) => {
        return (
          <div key={course.id}>
            <h2>{course.name}</h2>
            {course.parts.map((part) => (
              <p key={part.id}>
                {part.name} {part.exercises}
              </p>
            ))}
            <p>
              <strong>total of {exerciseTotal(course)} exercises</strong>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Course;
