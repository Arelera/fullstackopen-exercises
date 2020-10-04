import React, { useEffect, useState } from 'react';

import AddPerson from './components/AddPerson';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personsService from './services/personsService';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [personsToShow, setPersonsToShow] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    personsService.getAll().then((res) => {
      setPersons(res);
    });
  }, []);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const giveNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification('');
    }, 4000);
  };

  const onAddClick = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };

    let isUniqueName = persons.every((person) => person.name !== newName);

    if (isUniqueName) {
      personsService.create(newPerson).then((res) => {
        // res is empty for some reason,
        // so i cant use it for adding to state
        setPersons(persons.concat(newPerson));
        giveNotification(`${newPerson.name} added`);

        setNewName('');
        setNewNumber('');
      });
    } else {
      // if users wants to replace that users number
      // update users number and change it in database and state
      const shouldUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with the new one?`
      );
      if (shouldUpdate) {
        let updatedPerson = persons.find((person) => person.name === newName);
        updatedPerson = { ...updatedPerson, number: newNumber };
        personsService.update(updatedPerson);

        setPersons(
          persons.map((person) =>
            person.id !== updatedPerson.id ? person : updatedPerson
          )
        );

        giveNotification(`${updatedPerson.name} updated`);

        setNewName('');
        setNewNumber('');
      }
    }
  };

  return (
    <div
      style={{
        display: 'inline-block',
        border: '2px solid #123',
        padding: '1rem',
        color: '#222',
        background: '#fafafa',
      }}
    >
      <h2>Phonebook</h2>
      <Filter
        personsToShow={personsToShow}
        setPersonsToShow={setPersonsToShow}
      />
      {notification && <Notification msg={notification} />}
      <AddPerson
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        onAddClick={onAddClick}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons
        persons={persons}
        setPersons={setPersons}
        personsToShow={personsToShow}
      />
    </div>
  );
};

export default App;
