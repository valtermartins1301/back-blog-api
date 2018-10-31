const Joi = require('joi');
const { getAllPosts, createPost } = require('./handler');

const post = Joi.object({
  id: Joi.string().optional(),
  title: Joi.string().required(),
  content: Joi.string(),
});

function failAction(request, h, error) {
  console.error(error.toString());

  return error;
}

const route = [{
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
        posts: Joi.array().items(post).allow(null),
      },
    }
  },
},
{
  method: 'post',
  path: '/posts',
  handler: createPost,
  options: {
    description: 'create a post',
    tags: ['api', 'posts'],
    validate: {
      payload: post,
      headers: Joi.object({
        'authorization': Joi.string().required().description('authorization token'),
      }).unknown(),
      failAction
    },
    response: {
      failAction,
      schema: post
    }
  },
}
];

module.exports = route;
