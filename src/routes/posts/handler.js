const Boom = require('boom');
const blog = require('service/blog');

const createPost = function(request) {
  const { title, content } = request.payload;

  if(!title || !content) {
    return Boom.badData('missing title or content');
  }

  return blog.create({ title, content });
};

const getAllPosts = function() {
  return {
    posts: blog.list(),
  };
};

const findPost = function({ params }) {
  const { id } = params;
  const post = blog.find({ id });

  if(!post) {
    return Boom.notFound('post not found');
  }

  return post;
};

const removePost = function({ params }) {
  const { id } = params;

  if(!blog.find({ id })) {
    return Boom.notFound('post not found');
  }

  blog.delete({ id });

  return null;
};

module.exports = {
  getAllPosts,
  createPost,
  findPost,
  removePost,
};
