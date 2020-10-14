import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleChange = (value) => {
    dispatch(setFilter(value));
  };

  return (
    <div>
      filter{' '}
      <input onChange={(e) => handleChange(e.target.value)} value={filter} />
    </div>
  );
};

export default Filter;
