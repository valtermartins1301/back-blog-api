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

  find({ id }) {
    return POSTS.find(post => post.id === id);
  }

  list() {
    return POSTS;
  }

  delete({ id }) {
    const clone = POSTS;

    clone.find((post,index) => {
      if(post.id === id) {
        POSTS.splice(index, 1);
      }
    });

    return POSTS;
  }
}

const instance = new Blog();
module.exports = instance;
