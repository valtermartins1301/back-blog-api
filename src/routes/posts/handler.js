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

module.exports = {
  getAllPosts,
  createPost,
};
