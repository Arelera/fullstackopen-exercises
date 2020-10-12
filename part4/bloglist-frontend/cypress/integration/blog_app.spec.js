describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'tester',
      username: 'tester1',
      password: 'tester123',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('blogs');
  });

  it('login form can be opened', function () {
    cy.contains('login').click();
    cy.contains('username');
  });

  it('user can login', function () {
    // cypress reccommends to login directly with the api
    cy.login({ username: 'tester1', password: 'tester123' });

    // cy.request('POST', 'http://localhost:3003/api/login', {
    //   username: 'tester1',
    //   password: 'tester123',
    // }).then((response) => {
    //   localStorage.setItem('loggedBlogUser', JSON.stringify(response.body));
    //   cy.visit('http://localhost:3000');
    // });

    // cy.contains('login').click();
    // cy.get('#username').type('tester1');
    // cy.get('#password').type('tester123');
    // cy.get('#login-button').click();

    cy.contains('tester logged in');
  });

  it('login fails with wrong password', function () {
    cy.contains('login').click();
    cy.get('#username').type('tester1');
    cy.get('#password').type('random password');
    cy.get('#login-button').click();

    cy.get('.notification').should('contain', 'Wrong credentials!');

    cy.get('html').should('not.contain', 'tester1 logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tester1', password: 'tester123' });
    });

    it('a new blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('input:first').type('title only');
      cy.contains('create').click();

      cy.get('html').contains('New blog "title only" added!');
    });

    describe('and a new blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'third blog',
          author: 'author3',
          url: 'url3.com',
        });

        cy.createBlog({
          title: 'second blog',
          author: 'author2',
          url: 'url2.com',
        });
      });

      it('user can like a blog', function () {
        cy.contains('view').click();
        cy.contains('likes 0');

        cy.get('#like').click();
        cy.contains('likes 1');
      });

      it('user can delete a blog', function () {
        cy.contains('view').click();
        cy.contains('remove').click();
        cy.get('html').should('not.contain', 'title only');
      });

      it.only('blogs are descending by likes', function () {
        // COULDN'T DO THIS ONE  5.22
        // cy.contains('view').then((btn) => {
        //   btn.each((b) => cy.wrap(btn).click());
        // });
        // cy.get('.blog').each((blog) => {
        //   cy.wrap(blog).contains('likes');
        // });
      });
    });
  });
});
