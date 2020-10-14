// action creators
export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    filter,
  };
};

// reducers
const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter;
    default:
      return state;
  }
};

export default filterReducer;
