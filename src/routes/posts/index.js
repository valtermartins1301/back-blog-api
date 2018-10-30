const Joi = require('joi');
const { getAllPosts } = require('./handler');

const route = {
  method: 'get',
  path: '/posts',
  handler: getAllPosts,
  options: {
    description: 'List all posts',
    tags: ['api', 'posts'],
    validate: {
      headers: Joi.object({
        'username': Joi.string().required().description('user credentials'),
      }),
      failAction: 'error'
    },
    response: {
      failAction: 'error',
      schema: {
        posts: Joi.array()
      },
    }
  },
};

module.exports = route;
