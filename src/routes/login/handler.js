const Boom = require('boom');
const Auth = require('service/auth');

const login = function(request) {
  const { email, password } = request.payload;
  const user = Auth.login({ email, password });
  let response = Boom.unauthorized('invalid user or password');

  if(user) {
    response = {
      name: user.name,
      id: user.id,
    };
  }

  return response;
};

module.exports = {
  login,
};
