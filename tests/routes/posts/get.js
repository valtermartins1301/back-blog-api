const { expect } = require('chai');
const handler = require('routes/posts/handler');
const sandbox = require('sinon').createSandbox();
const Boom = require('boom');

describe('Route - Posts - Get', function () {
  let server;
  const post = {
    id: '12345',
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

  context('when getting one post', function() {
    context('when post was found', function() {
      it('returns the post info', async function () {
        sandbox.stub(handler, 'findPost').returns(post);

        const response = await server.inject({
          method: 'GET',
          url: '/posts/1234',
          headers: {
            authorization: '1234',
          },
          credentials: true,
          artifacts: true
        });

        expect(response.statusCode).to.be.eq(200);
      });
    });

    context('when post was not found', function() {
      it('returns not found', async function () {
        sandbox.stub(handler, 'findPost').returns(Boom.notFound('post not found'));

        const response = await server.inject({
          method: 'GET',
          url: '/posts/1234',
          headers: {
            authorization: '1234',
          },
          credentials: true,
          artifacts: true
        });

        expect(response.statusCode).to.be.eq(404);
      });
    });
  });
});
