const tasksRepo = require('./task.memory.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const create = task => tasksRepo.create(task);
const get = (taskId, boardId) => tasksRepo.get(taskId, boardId);
const update = (id, body) => tasksRepo.update(id, body);
const deleteTask = (taskId, boardId) => tasksRepo.deleteTask(taskId, boardId);

module.exports = { getAll, create, get, update, deleteTask };
