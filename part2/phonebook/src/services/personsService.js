import axios from 'axios';

const baseUrl = 'https://afternoon-tor-80403.herokuapp.com/api/persons';

const getAll = () =>
  axios.get(baseUrl).then((res) => {
    return res.data;
  });

const create = (newPerson) => axios.post(baseUrl, newPerson);

const update = (person) => axios.put(`${baseUrl}/${person.id}`, person);

const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export default {
  getAll,
  create,
  update,
  remove,
};
