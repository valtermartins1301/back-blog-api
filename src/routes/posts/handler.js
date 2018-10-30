const blog = require('service/blog');

const getAllPosts = function() {
  return {
    posts: blog.list(),
  };
};

module.exports = {
  getAllPosts,
};
