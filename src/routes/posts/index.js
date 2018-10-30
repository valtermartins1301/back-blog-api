const Joi = require('joi');
const { getAllPosts } = require('./handler');

function failAction(request, h, error) {
  console.error(error.toString());

  return error;
}

const route = {
  method: 'get',
  path: '/posts',
  handler: getAllPosts,
  options: {
    description: 'List all posts',
    tags: ['api', 'posts'],
    validate: {
      headers: Joi.object({
        'authorization': Joi.string().required().description('authorization token'),
      }).unknown(),
      failAction
    },
    response: {
      failAction,
      schema: {
        posts: Joi.array()
      },
    }
  },
};

module.exports = route;
