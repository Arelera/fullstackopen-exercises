const listHelper = require('../utils/list_helper');

test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

test('total likes must be 5', () => {
  const blogList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/...',
      likes: 5,
      __v: 0,
    },
  ];
  expect(listHelper.totalLikes(blogList)).toBe(5);
});

describe('favBlog', () => {
  test('favorite blog must be "Canonical string reduction"', () => {
    const blogs = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/...',
        likes: 5,
      },
      {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        likes: 12,
      },
    ];
    expect(listHelper.favoriteBlog(blogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });

  test('bob should have the most blogs', () => {
    const blogs = [
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Bob',
        likes: 5,
      },
      {
        title: 'Canonical string reduction',
        author: 'Bob',
        likes: 12,
      },
      {
        title: 'Go To Statement Considered Harmful',
        author: 'Dog',
        likes: 5,
      },
      {
        title: 'Canonical string reduction',
        author: 'Dude',
        likes: 12,
      },
    ];
    const result = listHelper.mostBlogs(blogs);

    console.log('mostBlogs result: ');
    // bob becomes lowercase for some reason
    expect(result).toEqual({ author: 'Bob', blogs: 2 });
  });
});
