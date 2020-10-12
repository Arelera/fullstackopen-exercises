import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { scryRenderedComponentsWithType } from 'react-dom/test-utils';

import Blog from './Blog';
import BlogForm from './BlogForm';

describe('<Blog />', () => {
  const blog = {
    title: 'blogtitle',
    author: 'blogauthor',
    likes: 0,
    url: 'blogurl.com',
    user: { name: 'bloguser' },
  };

  test('displays blog title and author, but no url or likes by default', () => {
    const component = render(<Blog blog={blog} />);

    expect(component.container).toHaveTextContent('blogtitle');
    expect(component.container).toHaveTextContent('blogauthor');
    expect(component.container).not.toHaveTextContent('likes');
    expect(component.container).not.toHaveTextContent('blogurl.com');
  });

  test('displays likes and blogurl after "view" button is clicked', () => {
    const component = render(<Blog blog={blog} />);
    const button = component.container.querySelector('button');
    const mockHandler = jest.fn();
    button.onclick(mockHandler);

    fireEvent.click(button);

    expect(component.container).toHaveTextContent('blogtitle');
    expect(component.container).toHaveTextContent('blogauthor');
    expect(component.container).toHaveTextContent('likes');
    expect(component.container).toHaveTextContent('blogurl.com');
  });

  test('if like is clicked twice, event handler is called twice', () => {
    const mockHandler = jest.fn();

    const component = render(<Blog blog={blog} handleLike={mockHandler} />);
    const expandButton = component.container.querySelector('button');

    fireEvent.click(expandButton); // expand to see like button

    const likeButton = component.container.querySelector('.likeBtn');

    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});

describe('<BlogForm />', () => {
  const blogs = [{ title: 'some blog' }];

  const setBlogs = (blogArr, newBlog) => {
    return blogArr.concat(newBlog);
  };

  test('after adding blog, setBlogs should be called with the right value', () => {
    const mockHandler = jest.fn();

    const component = render(<BlogForm blogs={blogs} setBlogs={mockHandler} />);

    const form = component.container.querySelector('form');
    const title = component.container.querySelector('.titleInput');
    const author = component.container.querySelector('.authorInput');
    const url = component.container.querySelector('.urlInput');

    fireEvent.change(title, {
      target: { value: 'newtitle' },
    });
    fireEvent.change(author, {
      target: { value: 'newauthor' },
    });
    fireEvent.change(url, {
      target: { value: 'newurl' },
    });

    fireEvent.submit(form);

    // COULDNT DO THIS ONE :/  5.16
  });
});
