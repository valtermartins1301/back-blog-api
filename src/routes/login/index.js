const Joi = require('joi');
const handler = require('./handler');

function failAction(request, h, error) {
  console.error(error.toString());

  return error;
}

const route = {
  method: 'post',
  path: '/login',
  handler: (request, reply) => handler.login(request, reply),
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
