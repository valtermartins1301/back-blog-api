const Inert = require('inert');
const Vision = require('vision');
const Hapi = require('hapi');
const HapiSwagger = require('hapi-swagger');
const simpleAuth = require('plugin/simple-auth');
const routes = require('routes');
const Auth = require('service/auth');

const registers = [
  simpleAuth,
  Inert,
  Vision,
  HapiSwagger
];

const server = Hapi.server({ port: 4000 });

(async () => {
  try {

    routes.forEach(route => server.route(route));

    await server.register(registers);

    server.auth.strategy('simple', 'custom', { validate: Auth.validate });
    server.auth.default('simple');

    await server.start();
  } catch (err) {
    console.error(err);

    process.exit(1);
  }
})();

module.exports = server;
