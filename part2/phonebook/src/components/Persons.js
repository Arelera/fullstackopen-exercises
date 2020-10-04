import React from 'react';
import Person from './Person';

const Persons = ({ persons, personsToShow, setPersons }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter((person) => {
          return person.name.toLowerCase().includes(personsToShow);
        })
        .map((person) => (
          <Person
            key={person.name}
            person={person}
            persons={persons}
            setPersons={setPersons}
          />
        ))}
    </div>
  );
};

export default Persons;
