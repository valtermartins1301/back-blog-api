const { expect } = require('chai');
const handler = require('routes/posts/handler');
const sandbox = require('sinon').createSandbox();
//const Boom = require('boom');

describe('Route - Posts - List', function () {
  let server;
  const post1 = {
    title: 'Some post',
    content: 'Better than nothing'
  };
  const post2 = {
    title: 'Some post',
    content: 'Better than nothing'
  };

  beforeEach(function() {
    server = require('index');
  });

  afterEach(function() {
    server.stop();
    sandbox.restore();
  });

  context('when authorization is missing', function() {
    it('returns bad request', async function () {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/posts',
      });

      expect(statusCode).to.be.eq(401);
    });
  });

  context('when listing all posts', function() {
    context('when has posts', function() {
      it('returns a list of posts', async function () {
        const payload = { posts: [ post1, post2 ] };
        sandbox.stub(handler, 'getAllPosts').resolves(payload);

        const response = await server.inject({
          method: 'GET',
          url: '/posts',
          headers: {
            authorization: '1234',
          },
          credentials: true,
          artifacts: true
        });

        expect(response.statusCode).to.be.eq(200);
        expect(JSON.parse(response.payload)).to.be.eql(payload);
      });
    });

    context('when does not has posts', function() {
      it('returns a empty list', async function () {
        const payload = { posts: [] };
        sandbox.stub(handler, 'getAllPosts').resolves(payload);

        const response = await server.inject({
          method: 'GET',
          url: '/posts',
          headers: {
            authorization: '1234',
          },
          credentials: true,
          artifacts: true
        });

        expect(response.statusCode).to.be.eq(200);
        expect(JSON.parse(response.payload)).to.be.eql(payload);
      });
    });
  });

  context('when listing all posts', function() {
    context('when has posts', function() {
      it('returns a list of posts', async function () {
        const payload = { posts: [ post1, post2 ] };
        sandbox.stub(handler, 'getAllPosts').resolves(payload);

        const response = await server.inject({
          method: 'GET',
          url: '/posts',
          headers: {
            authorization: '1234',
          },
          credentials: true,
          artifacts: true
        });

        expect(response.statusCode).to.be.eq(200);
        expect(JSON.parse(response.payload)).to.be.eql(payload);
      });
    });

    context('when does not has posts', function() {
      it('returns a empty list', async function () {
        const payload = { posts: [] };
        sandbox.stub(handler, 'getAllPosts').resolves(payload);

        const response = await server.inject({
          method: 'GET',
          url: '/posts',
          headers: {
            authorization: '1234',
          },
          credentials: true,
          artifacts: true
        });

        expect(response.statusCode).to.be.eq(200);
        expect(JSON.parse(response.payload)).to.be.eql(payload);
      });
    });
  });
});
