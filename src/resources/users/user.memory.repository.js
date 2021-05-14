const database = require('../../common/database');

const getAll = async () => database.getAllUsers();

const get = async (id) => {
  const user = await database.getUser(id);
  if (!user) {
    throw new Error(`User with id: ${id} was not found!`);
  }
  return user
};

const create = async user => database.createUser(user);

const update = async (id, body) => database.updateUser(id, body);

const deleteUser = async id => database.deleteUser(id);

module.exports = { getAll, create, get, update, deleteUser };
