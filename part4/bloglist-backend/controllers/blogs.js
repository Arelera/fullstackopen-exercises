const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const config = require('../utils/config');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  res.json(blogs);
});

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body;
  const token = getTokenFrom(req);

  if (!token) {
    return res.status();
  }

  const decodedToken = jwt.verify(token, config.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).send({ error: 'Token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

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
  const token = getTokenFrom(req);
  const id = req.params.id;
  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(404).send();
  }

  const decodedToken = jwt.verify(token, config.SECRET);

  if (blog.user.toString() === decodedToken.id.toString()) {
    try {
      await blog.remove();
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  const id = req.params.id;
  const newBlog = req.body;
  console.log('REQ BODY: ', newBlog);
  try {
    await Blog.findByIdAndUpdate(id, newBlog);
    // todo: 404 for wrong or missing id
    res.status(200).send();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
