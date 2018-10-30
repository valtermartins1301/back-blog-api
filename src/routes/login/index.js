const Joi = require('joi');
const { login } = require('./handler');

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
      failAction: 'error'
    },
    response: {
      failAction: 'error',
      schema: {
        id: Joi.string().required(),
        name: Joi.string().required()
      },
    }
  },
};

module.exports = route;
