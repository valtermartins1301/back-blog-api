const { expect } = require('chai');
const handler = require('routes/posts/handler');
const sandbox = require('sinon').createSandbox();

describe('Route - Posts - Create', function () {
  let server;
  const body = {
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
        method: 'POST',
        url: '/posts',
      });

      expect(statusCode).to.be.eq(401);
    });
  });

  context('when creating a post', function() {
    context('when body is invalid', function() {
      it('returns bad request', async function () {
        const response = await server.inject({
          method: 'POST',
          url: '/posts',
          headers: {
            authorization: '1234',
          },
          payload: {
            title: '123',
          },
          credentials: true,
          artifacts: true
        });

        expect(response.statusCode).to.be.eq(422);
      });
    });

    it('returns success', async function () {
      sandbox.stub(handler, 'createPost').returns({
        ...body,
        id: '1234',
      });

      const response = await server.inject({
        method: 'POST',
        url: '/posts',
        headers: {
          authorization: '1234',
        },
        payload: body,
        credentials: true,
        artifacts: true
      });

      expect(response.statusCode).to.be.eq(200);
    });
  });
});
