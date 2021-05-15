const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const create = task => tasksRepo.create(task);
const get = id => tasksRepo.get(id);
const update = (id, body) => tasksRepo.update(id, body);
const deleteTask = id => tasksRepo.deleteTask(id);

module.exports = { getAll, create, get, update, deleteTask };
