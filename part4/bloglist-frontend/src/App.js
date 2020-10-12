import React, { useEffect, useRef, useState } from 'react';
import blogService from './services/blogs';

import Togglable from './components/Togglable';
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

  // had to move it here for tests
  const handleLike = (blogState, setBlogState, blog) => {
    const newBlog = {
      ...blogState,
      user: blogState.user.id,
      likes: blogState.likes + 1,
    };
    delete newBlog.id;
    setBlogState({ ...blogState, likes: blogState.likes + 1 });

    blogService.update(blog.id, newBlog);
  };

  const blogFormRef = useRef();

  return (
    <div>
      <h2>blogs</h2>

      <p className="notification">{notification}</p>
      {user ? (
        <div>
          <Togglable ref={blogFormRef} buttonLabel={'new blog'}>
            <BlogForm
              blogFormRef={blogFormRef}
              blogs={blogs}
              setBlogs={setBlogs}
              giveNotification={giveNotification}
            />
            <button onClick={() => blogFormRef.current.toggleVisibility()}>
              cancel
            </button>
          </Togglable>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          {blogs.map((blog) => (
            <Blog
              blogs={blogs}
              setBlogs={setBlogs}
              key={blog.title}
              blog={blog}
              handleLike={handleLike}
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
