const uuidv4 = require('uuid/v4');

class Post {
  constructor({ title }) {
    this.id = uuidv4();
    this.title = title;
  }
}

module.exports = Post;
