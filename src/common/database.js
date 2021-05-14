const User = require('../resources/users/user.model');

const database = [];

database.push(new User(), new User(), new User())

const getAllUsers = async () => {
  const res = JSON.parse(JSON.stringify(database));
  return res
  // return database.slice(0)
}

const getUser = async id => database.filter(element => element.id === id)[0];

const createUser = async user => {
  database.push(user);
  return user
}

const updateUser = async (id, updateBody) => {
  const user = database.filter(element => element.id === id)[0];
  user.name = updateBody.name;
  user.login = updateBody.login;
  user.password = updateBody.password;
  return user
};

const deleteUser = async (id) => {
  const user = database.filter(element => element.id === id)[0];
  return database.splice(user, 1)
}

module.exports = { getAllUsers, getUser, createUser, updateUser, deleteUser };
