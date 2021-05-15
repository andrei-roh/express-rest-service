const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();
const create = board => boardsRepo.create(board);
const get = id => boardsRepo.get(id);
const update = (id, body) => boardsRepo.update(id, body);
const deleteBoard = id => boardsRepo.deleteBoard(id);

module.exports = { getAll, create, get, update, deleteBoard };
