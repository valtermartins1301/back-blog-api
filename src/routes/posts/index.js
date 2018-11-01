const Joi = require('joi');
const handler = require('./handler');

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
  handler: (request, h) => handler.getAllPosts(request, h),
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
  handler: (request, h) => handler.createPost(request, h),
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
},
{
  method: 'get',
  path: '/posts/{id}',
  handler: (request, h) => handler.findPost(request, h),
  options: {
    description: 'find a post',
    tags: ['api', 'posts'],
    validate: {
      params: {
        id: Joi.string().required(),
      },
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
},
{
  method: 'delete',
  path: '/posts/{id}',
  handler: (request, h) => handler.removePost(request, h),
  options: {
    description: 'delete a post',
    tags: ['api', 'posts'],
    validate: {
      params: {
        id: Joi.string().required(),
      },
      headers: Joi.object({
        'authorization': Joi.string().required().description('authorization token'),
      }).unknown(),
      failAction
    },
    response: {
      emptyStatusCode: 204
    },
  },
}];

module.exports = route;
