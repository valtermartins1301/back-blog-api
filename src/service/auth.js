const users = require('fake/users');

class Auth{
  constructor(){
    if(!Auth.instance) {
      Auth.instance = this;
    }

    return Auth.instance;
  }

  validate(request, username, password) {
    const user = users.find(user => user.username === username);
    if (!user) {
      return { credentials: null, isValid: false };
    }

    const isValid = user.password === password;
    const credentials = { id: user.id, name: user.name };

    return { isValid, credentials };
  }

  login({ email, password }) {
    const user = users[email] || {};
    const isValid = user.password === password;

    return isValid ? user : false;
  }
}

const instance = new Auth();
module.exports = instance;
