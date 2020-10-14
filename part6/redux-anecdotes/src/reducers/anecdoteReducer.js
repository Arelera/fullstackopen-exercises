import anecdoteService from '../services/anecdotes';

// action creators
export const newNote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch({
      type: 'NEW_NOTE',
      data: newAnecdote,
    });
  };
};

export const initialize = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: 'INITIALIZE',
      anecdotes,
    });
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.vote(anecdote);
    dispatch({
      type: 'VOTE',
      data: { id: newAnecdote.id },
    });
  };
};

// reducer
const reducer = (state = [], action) => {
  // console.log('state now: ', state);
  // console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const likedAnecdote = state.find(
        (anecdote) => anecdote.id === action.data.id
      );
      likedAnecdote.votes += 1;
      return state.map((a) => (a.id !== action.data.id ? a : likedAnecdote));
    case 'NEW_NOTE':
      const newAnecdote = { ...action.data };
      return [...state, newAnecdote];
    case 'INITIALIZE':
      const anecdotes = action.anecdotes;
      return anecdotes;
    default:
      return state;
  }
};

export default reducer;
