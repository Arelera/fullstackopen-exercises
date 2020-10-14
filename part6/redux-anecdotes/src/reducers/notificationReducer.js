//action creators
export const giveNotification = (message) => {
  return {
    type: 'MESSAGE',
    message,
  };
};
export const removeNotification = (message) => {
  return {
    type: 'REMOVE',
    message,
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
