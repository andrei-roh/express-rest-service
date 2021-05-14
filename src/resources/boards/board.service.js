const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const create = user => boardsRepo.create(user);
const get = id => boardsRepo.get(id);
const update = (id, body) => boardsRepo.update(id, body);
const deleteBoard = id => boardsRepo.deleteUser(id);

module.exports = { getAll, create, get, update, deleteBoard };
