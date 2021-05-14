const database = require('../../common/database');

const getAll = async () => database.getAllUsers();
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
const create = async user => database.createUser(user);

const update = async (id, body) => database.updateUser(id, body);

const deleteUser = async id => database.deleteUser(id);

=======
>>>>>>> Stashed changes
module.exports = { getAll, create, get, update, deleteUser };
