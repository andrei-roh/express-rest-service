const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const create = user => usersRepo.create(user);

const get = id => usersRepo.get(id);

const update = (id, body) => usersRepo.update(id, body);

const deleteUser = id => usersRepo.deleteUser(id);

module.exports = { getAll, create, get, update, deleteUser };
