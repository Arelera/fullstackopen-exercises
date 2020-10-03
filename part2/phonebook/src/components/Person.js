import React from 'react';
import personsService from '../services/personsService';

const Person = ({ person, persons, setPersons }) => {
  const handleDeleteClick = (id) => {
    personsService
      .remove(id)
      .then((res) => {
        setPersons(
          persons.filter((person) => (person.id !== id ? person : null))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <p key={person.name}>
        {person.name} {person.number}{' '}
        <button onClick={() => handleDeleteClick(person.id)}>delete</button>
      </p>
    </div>
  );
};

export default Person;
