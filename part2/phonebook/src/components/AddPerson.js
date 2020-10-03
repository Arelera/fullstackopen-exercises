import React from 'react';

const AddPerson = ({
  handleNameChange,
  handleNumberChange,
  onAddClick,
  newName,
  newNumber,
}) => {
  return (
    <form>
      <h2>Add a new</h2>
      <div>
        name: <input onChange={handleNameChange} value={newName} />
        <br />
        number: <input onChange={handleNumberChange} value={newNumber} />
      </div>

      <button onClick={onAddClick} type="submit">
        add
      </button>
    </form>
  );
};

export default AddPerson;
