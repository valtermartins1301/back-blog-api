const Joi = require('joi');
const { login } = require('./handler');

function failAction(request, h, error) {
  console.error(error.toString());

  return error;
}

const route = {
  method: 'post',
  path: '/login',
  handler: login,
  options: {
    description: 'Authenticate a user',
    tags: ['api', 'login'],
    auth: false,
    validate: {
      payload : {
        email: Joi.string().email().required(),
        password: Joi.string().required().min(4),
      },
      failAction,
    },
    response: {
      failAction,
      schema: {
        id: Joi.string().required(),
        name: Joi.string().required(),
        username: Joi.string().required(),
        token: Joi.string().required(),
      },
    }
  },
};

module.exports = route;
