const { expect } = require('chai');
const handler = require('routes/posts/handler');
const sandbox = require('sinon').createSandbox();

describe('Route - Posts - Create', function () {
  let server;

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
        method: 'DELETE',
        url: '/posts/1234',
      });

      expect(statusCode).to.be.eq(401);
    });
  });

  context('when removing a post', function() {
    context('when id is not found', function() {
      it('returns not found', async function () {
        const response = await server.inject({
          method: 'DELETE',
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

    it('returns success', async function () {
      sandbox.stub(handler, 'removePost').returns(null);

      const response = await server.inject({
        method: 'DELETE',
        url: '/posts/1234',
        headers: {
          authorization: '1234',
        },
        credentials: true,
        artifacts: true
      });

      expect(response.statusCode).to.be.eq(204);
    });
  });
});
