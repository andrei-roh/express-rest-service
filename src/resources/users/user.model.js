const uuid = require('uuid');

/**
  * Create user's class.
  * @param { Object } user - User's information
  * @param { String } user.id - User's id. Create with uuid version 4
  * @param { String } user.name - User's name
  * @param { String } user.login - User's login
  * @param { String } user.password - User's password
  */
class User {
  constructor({
    id = uuid.v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd'
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
