import React from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  // const dispatch = useDispatch();
  // const filter = useSelector((state) => state.filter);

  const handleChange = (value) => {
    props.dog(value);
  };

  return (
    <div>
      filter{' '}
      <input
        onChange={(e) => handleChange(e.target.value)}
        value={props.filter}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dog: (value) => {
      dispatch(setFilter(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
