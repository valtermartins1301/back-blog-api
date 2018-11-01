const { expect } = require('chai');
const handler = require('routes/login/handler');
const sandbox = require('sinon').createSandbox();
const Boom = require('boom');

describe('Route - Login', function () {
  let server;

  beforeEach(function() {
    server = require('index');
  });

  afterEach(function() {
    server.stop();
    sandbox.restore();
  });

  context('when use an invalid password', function() {
    beforeEach(function() {
      sandbox.stub(handler, 'login').resolves(Boom.unauthorized());
    });

    it('returns unauthorized', async function () {
      const { statusCode } = await server.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'flu.bar@test.com',
          password: '3331234',
        }
      });

      expect(statusCode).to.be.eq(401);
    });
  });

  context('when user log in', function() {
    beforeEach(function() {
      sandbox.stub(handler, 'login').resolves({
        id: '1234',
        name: 'fluba bar',
        username: 'flu.bar',
        token: '01293-dqwqwd',
      });
    });

    it('returns success', async function () {
      const { statusCode } = await server.inject({
        method: 'POST',
        url: '/login',
        payload: {
          email: 'flu.bar@test.com',
          password: '3331234',
        }
      });

      expect(statusCode).to.be.eq(200);
    });
  });
});
