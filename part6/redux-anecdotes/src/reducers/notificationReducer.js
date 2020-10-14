//action creators
export const setNotification = (message, ms = 5) => {
  return async (dispatch) => {
    dispatch({
      type: 'MESSAGE',
      message,
    });
    setTimeout(() => {
      console.log('SETTIMEOUT');
      dispatch({
        type: 'REMOVE',
      });
    }, ms * 1000);
  };
};

// reducer
const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'MESSAGE':
      return action.message;
    case 'REMOVE':
      return null;

    default:
      return state;
  }
};

export default notificationReducer;
