import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blogs, setBlogs, blog, handleLike }) => {
  const [expanded, setExpanded] = useState(false);
  const [blogState, setBlogState] = useState(blog);

  // const handleLike = () => {
  //   const newBlog = {
  //     ...blogState,
  //     user: blogState.user.id,
  //     likes: blogState.likes + 1,
  //   };
  //   delete newBlog.id;
  //   setBlogState({ ...blogState, likes: blogState.likes + 1 });

  //   blogService.update(blog.id, newBlog);
  // };

  // TODO: have a remove blog button if user added that blog

  const handleRemoveClick = () => {
    const wannaRemove = window.confirm(
      `Remove blog "${blogState.title}" by ${blogState.author}.`
    );

    if (!wannaRemove) {
      return;
    }
    const user = JSON.parse(window.localStorage.getItem('loggedBlogUser'));
    // blogService.setToken(user.token);
    blogService.remove(blogState.id);

    // for removing it from front end
    setBlogs(blogs.filter((b) => b.id !== blogState.id));

    console.log('remove clicked');
  };

  return (
    <div className="blog" style={{ borderBottom: '1px solid #aaa' }}>
      <h3>
        {blog.title} - <em style={{ color: '#555' }}>{blog.author}</em>{' '}
        <button onClick={() => setExpanded(!expanded)}>view</button>
      </h3>
      {expanded && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blogState.likes}{' '}
            <button
              id="like"
              onClick={() => handleLike(blogState, setBlogState, blog)}
            >
              like
            </button>
          </p>
          <p>{blog.user.name}</p>
          <button onClick={handleRemoveClick}>remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
