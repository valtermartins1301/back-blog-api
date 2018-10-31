const Post = require('model/post');

const POSTS = [];

class Blog{
  constructor(){
    if(!Blog.instance) {
      Blog.instance = this;
    }

    return Blog.instance;
  }

  create({ title, content }) {
    const post = new Post({ title , content });

    POSTS.push(post);
    
    return post;
  }

  list() {
    return POSTS;
  }
}

const instance = new Blog();
module.exports = instance;
