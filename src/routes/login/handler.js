const Boom = require('boom');
const Auth = require('service/auth');

const login = function(request) {
  const { email, password } = request.payload;
  const credential = Auth.login({ email, password });
  let response = Boom.unauthorized('Invalid email or password');

  if(credential) {
    response ={
      id: credential.id,
      name: credential.name,
      username: credential.username,
      token: credential.token,
    };
  }

  return response;
};

module.exports = {
  login,
};
