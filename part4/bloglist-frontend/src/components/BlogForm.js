import React, { useState, useRef } from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const BlogForm = ({ blogs, setBlogs, giveNotification }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleBlogCreate = async (e) => {
    console.log('BLOGS: ', blogs);
    e.preventDefault();
    const createdBlog = await blogService.create(newBlog);
    setBlogs(blogs.concat(createdBlog));
    giveNotification(`New blog "${createdBlog.title}" added!`);

    blogFormRef.current.toggleVisibility();

    setNewBlog({ title: '', author: '', url: '' });
  };

  const blogFormRef = useRef();

  return (
    <Togglable ref={blogFormRef} buttonLabel={'new blog'}>
      <form onSubmit={handleBlogCreate}>
        <div>
          title:
          <input
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            type="text"
          />
        </div>
        <div>
          author:
          <input
            value={newBlog.author}
            onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
            type="text"
          />
        </div>
        <div>
          url:
          <input
            value={newBlog.url}
            onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
            type="text"
          />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={() => blogFormRef.current.toggleVisibility()}>
        cancel
      </button>
    </Togglable>
  );
};

export default BlogForm;
