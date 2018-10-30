const users = require('fake/users');
const uuidv4 = require('uuid/v4');
const CREDENTIALS = [];

class Auth{
  constructor(){
    if(!Auth.instance) {
      Auth.instance = this;
    }

    return Auth.instance;
  }

  validate(request, authorization) {
    const user = CREDENTIALS.find(user => user.token === authorization);

    if (!user) {
      return { credentials: null, isValid: false };
    }

    const isValid = true;
    const credentials = { id: user.id, name: user.name };

    return { isValid, credentials };
  }

  login({ email, password }) {
    const user = users.find(user => user.email === email) || {};

    if(user.password !== password) {
      return false;
    }

    const token = uuidv4();
    const credentials = {
      ...user,
      token,
    };
    CREDENTIALS.push(credentials);

    return credentials;
  }
}

const instance = new Auth();
module.exports = instance;
