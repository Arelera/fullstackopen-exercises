import React from 'react';

const Filter = ({ personsToShow, setPersonsToShow }) => {
  return (
    <div>
      filter shown with{' '}
      <input
        value={personsToShow}
        onChange={(e) => setPersonsToShow(e.target.value.toLowerCase())}
      />{' '}
    </div>
  );
};

export default Filter;
