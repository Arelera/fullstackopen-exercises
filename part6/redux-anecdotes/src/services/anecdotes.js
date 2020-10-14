import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const obj = { content, votes: 0 };
  const response = await axios.post(baseUrl, obj);
  return response.data;
};

const vote = async (anecdote) => {
  console.log('ANECDOTE', anecdote);
  const response = await axios.patch(`${baseUrl}/${anecdote.id}`, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });

  return response.data;
};

export default { getAll, createNew, vote };
