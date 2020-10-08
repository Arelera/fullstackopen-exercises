const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const total = blogs.reduce((acc, blog) => {
    return acc + blog.likes;
  }, 0);
  return total;
};

const favoriteBlog = (blogs) => {
  let topBlog = { likes: -1 };
  blogs.forEach((blog) => {
    if (blog.likes > topBlog.likes) {
      topBlog = blog;
    }
  });
  return topBlog;
};

const mostBlogs = (blogs) => {
  const blogCounts = {};

  blogs.forEach((blog) => {
    blogCounts[blog.author]
      ? (blogCounts[blog.author] += 1)
      : (blogCounts[blog.author] = 1);
  });

  let topBlogger = { author: '', blogs: -1 };
  for (author in blogCounts) {
    if (blogCounts[author] > topBlogger.blogs) {
      topBlogger.author = author;
      topBlogger.blogs = blogCounts[author];
    }
  }
  return topBlogger;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
