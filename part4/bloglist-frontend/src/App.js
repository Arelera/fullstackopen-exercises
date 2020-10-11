import React, { useEffect, useState } from 'react';
import blogService from './services/blogs';

import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes));
      console.log(blogs);
    });
  }, []);

  useEffect(() => {
    let loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogUser'));

    if (loggedUser) {
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogUser');
  };

  const giveNotification = (msg, error = false) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h2>blogs</h2>

      {notification}
      {user ? (
        <div>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            giveNotification={giveNotification}
          />
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          {blogs.map((blog) => (
            <Blog
              blogs={blogs}
              setBlogs={setBlogs}
              key={blog.title}
              blog={blog}
            />
          ))}
        </div>
      ) : (
        <LoginForm setUser={setUser} giveNotification={giveNotification} />
      )}
    </div>
  );
}

export default App;
