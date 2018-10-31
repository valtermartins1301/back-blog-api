const uuidv4 = require('uuid/v4');

class Post {
  constructor({ title, content }) {
    this.id = uuidv4();
    this.title = title;
    this.content = content;
  }
}

module.exports = Post;
