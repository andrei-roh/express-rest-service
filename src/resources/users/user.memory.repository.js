const database = require('../../common/database');

const getAll = async () => database.getAllUsers();

const create = async user => database.createUser(user);

const get = async id => {
  const user = await database.getUser(id);
  if (!user) {
    throw new Error(`User with id: ${id} was not found!`);
  }
  return user
};

const update = async (id, body) => {
  const user = database.updateUser(id, body);
  if (!user) {
    throw new Error(`User with id: ${id} was not found!`);
  }
  return user
};

const deleteUser = async id => {
  const user = await database.deleteUser(id);
  if (!user) {
    throw new Error(`User with id: ${id} was not found!`);
  }
  return user
};

module.exports = { getAll, create, get, update, deleteUser };
