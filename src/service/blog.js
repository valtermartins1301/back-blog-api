const Post = require('model/post');

const POSTS = [];

class Blog{
  constructor(){
    if(!Blog.instance) {
      Blog.instance = this;
    }

    return Blog.instance;
  }

  create({ title, }) {
    const post = new Post({ title });

    return post;
  }

  list() {
    return POSTS;
  }
}

const instance = new Blog();
module.exports = instance;
