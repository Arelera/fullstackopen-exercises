import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loginService from '../services/login';
import blogService from '../services/blogs';

const LoginForm = ({ setUser, giveNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loggedUser = await loginService.login({ username, password });
      setUser(loggedUser);

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      giveNotification(`${loggedUser.username} logged in`);
      setUsername('');
      setPassword('');
    } catch (exception) {
      console.log('EXCEPTION', exception);
      giveNotification('Wrong credentials!', true);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>log-in to application</h2>
      <div>
        username
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
        password
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  giveNotification: PropTypes.func.isRequired,
};

export default LoginForm;
