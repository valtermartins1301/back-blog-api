const Boom = require('boom');

const implementation = function(server, options) {
  const scheme = {
    authenticate: async function(request, h) {
      const authorization = request.headers.authorization;

      if (!authorization) {
        throw Boom.unauthorized(options.unauthorizedAttributes);
      }

      const { isValid, credentials, response } = await options.validate(request, authorization, h);

      if (response !== undefined) {
        return h.response(response).takeover();
      }

      if (!isValid) {
        const unauthenticated = Boom.unauthorized('Bad username or password');

        return h.unauthenticated(unauthenticated, credentials ? { credentials } : null);
      }

      if (!credentials || typeof credentials !== 'object') {
        throw Boom.badImplementation('Bad credentials object received for simple auth validation');
      }

      return h.authenticated({ credentials });
    }
  };

  return scheme;
};

module.exports = {
  name: 'simple-auth',
  version: '1.0.0',
  register: function (server) {

    server.auth.scheme('custom', implementation);
  }
};
