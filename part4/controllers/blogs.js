const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body;

  if (!body.title || !body.url) {
    return res.status(400).send({ error: 'Title or url missing' });
  }

  const user = await User.findById(body.userId);

  const blog = new Blog({
    ...body,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.json(savedBlog);
});

blogsRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (blog) {
      await blog.remove();
      return res.status(204).send();
    }
    return res.status(404).send();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const newBlog = req.body;

  try {
    await Blog.findByIdAndUpdate(id, newBlog);
    // todo: 404 for wrong or missing id
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
