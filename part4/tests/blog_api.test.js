const app = require('../app');
const supertest = require('supertest');
const mongoose = require('mongoose');
const api = supertest(app);
const Blog = require('../models/blog');

const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    url: 'ok',
    author: 'Bob',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    url: 'ok',
    author: 'Bob',
    likes: 12,
  },
  {
    title: 'Go To Statement Considered Harmful',
    url: 'ok',
    author: 'Dog',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    url: 'ok',
    author: 'Dude',
    likes: 12,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  for (blog of initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('viewing blogs', () => {
  test('can fetch all blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body.length).toBe(4);
  });

  test('blog has "id" property', async () => {
    const response = await api.get('/api/blogs').expect(200);
    for (blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });
});

describe('creating blogs', () => {
  test('a new blog can be created', async () => {
    const newBlog = { title: 'What is up', url: 'ok', author: 'Nat' };
    await api.post('/api/blogs').send(newBlog).expect(201);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body.length).toBe(initialBlogs.length + 1);
  });

  test('a new blogs likes property defaults to 0', async () => {
    const newBlog = { title: 'yum', url: 'ok', author: 'wow' };
    await api.post('/api/blogs').send(newBlog).expect(201);

    const blogsAtEnd = await api.get('/api/blogs');
    expect(blogsAtEnd.body.slice(-1)[0].likes).toBe(0);
  });

  test('missing title or url should give status 404', async () => {
    const newBlog = { author: 'dude' };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
});

describe('deleting blogs', () => {
  test('succeeds with statuscode 204 if id is valid', async () => {
    let blogs = await Blog.find({});
    const blogToDelete = blogs[0].toJSON();
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    blogs = await Blog.find({});
    expect(blogs.length).toBe(initialBlogs.length - 1);
  });
});

describe('updating blogs', () => {
  test('succeeds with statuscode 200 if id is valid', async () => {
    const blogs = await Blog.find({});
    const blog = blogs[0].toJSON();
    blog.title = 'Some new title';

    await api.put(`/api/blogs/${blog.id}`).send(blog).expect(200);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
