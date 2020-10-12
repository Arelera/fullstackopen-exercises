import React, { useState, useRef } from 'react';
import blogService from '../services/blogs';
import Togglable from './Togglable';

const BlogForm = ({ blogs, setBlogs, giveNotification, blogFormRef }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' });

  const handleBlogCreate = async (e) => {
    console.log('BLOGS: ', blogs);
    e.preventDefault();
    const createdBlog = await blogService.create(newBlog);
    console.log('SETBLOGS: ', setBlogs(blogs.concat(createdBlog)));
    giveNotification(`New blog "${createdBlog.title}" added!`);

    blogFormRef.current.toggleVisibility();

    setNewBlog({ title: '', author: '', url: '' });
  };

  return (
    <form ref={blogFormRef} onSubmit={handleBlogCreate}>
      <div>
        title:
        <input
          className="titleInput"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          type="text"
        />
      </div>
      <div>
        author:
        <input
          className="authorInput"
          value={newBlog.author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          type="text"
        />
      </div>
      <div>
        url:
        <input
          className="urlInput"
          value={newBlog.url}
          onChange={(e) => setNewBlog({ ...newBlog, url: e.target.value })}
          type="text"
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
